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
