// app/routes/todos.tsx
import { Outlet } from "@remix-run/react";
import { Separator } from "@/components/ui/separator";

export default function Todos() {
  return (
    <div className="bg-orange-300">
      <div className="flex items-center space-x-6 ">
        <h1 className="text-2xl font-bold">Todoページ</h1>
      </div>

      <Separator className="mb-4 mt-2 border-2 border-gray-400" />

      {/* /todos~の共通箇所はroot.tsxと同様にOutletコンポーネントを使用できる。*/}
      <Outlet />
    </div>
  );
}
