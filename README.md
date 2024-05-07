# ReactフレームワークのRemixでTODOアプリ作成（shadcn/ui, Prisma使用）
https://qiita.com/fsdg-takada/items/5a24382bc73c5bd85c2d の写経

## アプリの作成
```
$ npx create-remix@latest
```
remix-todo-app のプロジェクト名を設定。

## いったん起動
```
$ cd remix-todo-app
$ npm run dev
```

## TailWind CSSを導入
```
$ npm install -D tailwindcss
$ npx tailwindcss init
```

## shadcn/ui の設定
```
$ npx shadcn-ui@latest init
```
選択肢が出てくるので選択
```
Created Tailwind CSS config file: tailwind.config.js
PS C:\develop\GitHub\remix-todo-app> npx shadcn-ui@latest init
√ Would you like to use TypeScript (recommended)? ... no / yes
√ Which style would you like to use? » Default
√ Which color would you like to use as base color? » Slate
√ Where is your global CSS file? ... app/tailwind.css
√ Would you like to use CSS variables for colors? ... no / yes
√ Are you using a custom tailwind prefix eg. tw-? (Leave blank if not) ...
√ Where is your tailwind.config.js located? ... tailwind.config.js
√ Configure the import alias for components: ... @/components
√ Configure the import alias for utils: ... @/lib/utils
```
postcss.config.cjs を作成して設定
```
// postcss.config.cjs
module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  };
```
remix.config.js に追記
```
/** @type {import('@remix-run/dev').AppConfig} */
export default {
  ...
  tailwind: true,  // 追加
  postcss: true,   // 追加
  ...
};
```
root.tsxでtailwind.cssを読み込み、適用させるように実装します。
```
// app/root.tsx
+ import styles from "./tailwind.css"
```

## 共通レイアウトの作成
- app/root.tsx の変更
- shadcn/uiのコンポーネントの追加
shadcn/uiのSeparatoreコンポーネントを使用します。また、Buttonコンポーネントのスタイルも使用したいため、以下を実行して追加します。
```
$ npx shadcn-ui@latest add separator
$ npx shadcn-ui@latest add button
```
- app/components/side-bar-nav.tsxを作成
- app/routes/_index.tsx の変更

ここまでで、npm run devを実行し、http://localhost:3000/ を開くと左にメニュー、右にコンテンツとなっている画面が表示されます。
薄赤の部分がapp/root.tsxの共通レイアウト部分で、青部分が_index.tsxの部分となります。

※この時点ではサイドバーのメニューをクリックしても404になる。

## メニューの飛び先を実装
- app/routes/todos.tsx を作成
- app/routes/users.tsx を作成

- サイドバーメニューのアクティブ時の色変更

## TODO一覧の作成

### データ操作の準備
prisma の追加
```
$ npm install prisma --save-dev
```
Prismaのセットアップ(sqlite)
```
$ npx prisma init --datasource-provider sqlite
```
prisma/schema.prisma に テーブルの設定
```
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Todo {
  id    Int     @id @default(autoincrement())
  title String 
  done  Boolean
}
```
マイグレーションの実行
```
$ npx prisma migrate dev --name init
```
初期データの設定
prisma/script.js というファイルを作成し、その中に初期データを挿入する
```
// prisma/script.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.todo.create({
    data: {
      title: "todo1",
      done: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```
以下を実行したうえで、npx prisma studioを実行し、データが挿入されていることを確認します。
```
$ node prisma/script.js 
$ npx prisma studio
```
最後にPrismaClientインスタンスをシングルトンとして扱うように実装します。app/singleton.server.tsとapp/db.server.tsファイルを作成し、それぞれ以下のように実装します。
```
// app/singleton.server.ts
export const singleton = <Value>(
  name: string,
  valueFactory: () => Value
): Value => {
  const g = global as any;
  g.__singletons ??= {};
  g.__singletons[name] ??= valueFactory();
  return g.__singletons[name];
};
```
```
// app/db.server.ts
import { PrismaClient } from "@prisma/client";
import { singleton } from "~/singleton.server";

export const prisma = singleton("prisma", () => new PrismaClient());
```

### 一覧の作成
- app/routes/todos.tsx の変更
- sadcn/uiのTable関連のテーブル コンポーネントの追加
```
$ npx shadcn-ui@latest add table
```
- app/routes/todos._index.tsx を作成して実装


## TODO作成機能
TODO作成機能を実装します。まず、shadcn/uiのInputとLableコンポーネントを使用しますので、それぞれを追加します。
```
$ npx shadcn-ui@latest add input
$ npx shadcn-ui@latest add label
```
- TODO一覧ページから作成ページに繊維するためのリンク作成
- app/routes/todos.new.tsxファイルを作成し実装


## TODOの編集機能
- app/routes/todos._index.tsx を修正
- ラジオグループを使うためにコンポーネント追加
```
$ npx shadcn-ui@latest add radio-group
```
- app/routes/todos.$todoId.edit.tsxを作成し実装


## TODOの削除機能
app/routes/todos._index.tsx内にアクションを定義してもよいのですが、Remixではファイル内にaction関数だけ定義することも可能


## User一覧機能実装（APIを呼ぶケース）
TODOの機能は一通り実装済みです。ただし、現実の開発ではAPIをRemix内ではなく、別に分けて開発したいというケースがあると思います（例えば、ほかのアプリでも使用される共通のAPIをたたく場合など）。
この場合、RemixはBFF(Backend For Frontend)としての機能を兼ねることとなります。

- app/routes/users.tsx ファイルの実装
- app/routes/users._index.tsx ファイルを作成し実装


## Zodによるバリデーション追加（登録ページ）
https://qiita.com/fsdg-takada/items/1a44e05d0c81d7cd37bb
必要なライブラリを追加
```
$ npm install remix-validated-form @remix-validated-form/with-zod
```
- todos.new.tsx に実装






# Welcome to Remix + Vite!

📖 See the [Remix docs](https://remix.run/docs) and the [Remix Vite docs](https://remix.run/docs/en/main/guides/vite) for details on supported features.

## Development

Run the Vite dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`
