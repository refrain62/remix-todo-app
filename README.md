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
```




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
