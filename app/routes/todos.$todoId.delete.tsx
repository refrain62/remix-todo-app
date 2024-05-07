import { redirect, type ActionFunctionArgs } from "@remix-run/node"
import { prisma } from "~/db.server"

export const action = async ({ params }: ActionFunctionArgs) => {
  // バリデーション実装は割愛し、エラーをスロー
  if (typeof params.todoId !== "string") {
    throw Erorr("invalid params")
  }

  await prisma.todo.delete({ where: { id: Number(params.todoId) } });

  // 画面上は一緒でも、action呼び出しは /todos/delete というパスになるので、redirectさせる必要がある
  return await redirect("/todos")
}
