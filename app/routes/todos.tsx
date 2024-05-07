// app/routes/todos.tsx
import { Outlet, Link } from "@remix-run/react";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { Library } from "lucide-react";

export default function Todos() {
  return (
    <div className="bg-orange-300">
      <div className="flex items-center space-x-6 ">
        <h1 className="text-2xl font-bold">Todoページ</h1>
        <Link to="new" className={buttonVariants()}>
          新規
        </Link>
      </div>

      <Separator className="mb-4 mt-2 border-2 border-gray-400" />

      {/* /todos~の共通箇所はroot.tsxと同様にOutletコンポーネントを使用できる。*/}
      <Outlet />
    </div>
  );
}
