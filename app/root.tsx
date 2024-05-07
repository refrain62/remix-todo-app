import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { Separator } from "@/components/ui/separator";
import { SideBarNav } from "@/components/side-bar-nav";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
// ?urlをつけないとエラーになる
import stylesheet from "~/tailwind.css?url"

// HeaderのLinkに設定する内容
export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

// meta関数をエクスポートすることで、title等を変更できます。
export const meta: MetaFunction = () => {
  return [
    { title: "Remix Todo App" },
    { name: "rescription", content: "Remix Todo App"},
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div
          className="flex h-screen overflow-hidden bg-red-200"
          style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
        >
          <aside className="w-[250px] px-4 py-5">
            <div className="space-y-4">
              <Link to="/" className="text-xl font-bold hover:opacity-70">
                TODOアプリ
              </Link>
              {/* shadcn/uiのSeparatorコンポーネントを使用。この後、追加します。 */}
              <Separator className="border-2 border-gray-400" />
              {/* この後、コンポーネントを作成 */}
              <SideBarNav />
            </div>
          </aside>

          <Separator
            orientation="vertical"
            className="h-screen border-2 border-gray-400"
          />

          <main className="flex-1 overflow-y-scroll px-8 pt-12">
            {/* childrenコンポーネントに共通部分以外が入る形となります。 */}
            {children}
          </main>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  {/* Outletコンポーネントに共通部分以外が入る形となります。 */}
  return <Outlet />;
}
