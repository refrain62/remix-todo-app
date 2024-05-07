// app/routes/todos._index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "~/db.server";

// Remixでは各ページファイルでloaderという名前の関数に取得処理を記載し、exportするとことで、自動でデータの取得を行いUIに渡します。
export const loader = async () => {
  // サーバー側で取得するので、prismaを使用し、直接データ取得できる
  const todos = await prisma.todo.findMany();
  // jsonはRemixが用意しているヘルパー関数
  return json(todos);
};

export default function TodosIndex() {
  // loaderで取得するデータはuseLoaderData関数で取得できる。また、ジェネリクスにtypeof loaderを渡すことで型の補完も行える。
  const todos = useLoaderData<typeof loader>();

  return (
    <Table className="bg-yellow-100">
      <TableHeader>
        <TableRow>
          <TableHead>todo名</TableHead>
          <TableHead>進捗</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {todos.map((todo) => (
          <TableRow key={todo.id}>
            <TableCell className="w-4/12">{todo.title}</TableCell>
            <TableCell className="w-4/12">
              {todo.done ? "完了" : "未了"}
            </TableCell>
            <TableCell className="w-4/12 space-x-2">
              <Button>編集</Button>
              <Button variant="destructive">削除</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
