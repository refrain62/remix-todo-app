// app/routes/todos.$todoId.edit.tsx
import { Label } from "@radix-ui/react-label";

import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { prisma } from "~/db.server";

// 引数のオブジェクトにprismaを指定することで、URLの動的セグメントを取得することができます。
export const loader = async ({ params }: LoaderFunctionArgs) => {
  // バリデーション実装は割愛し、エラーをスロー
  if (typeof params.todoId !== "string") {
    throw Error("invalid params");
  }

  const todo = await prisma.todo.findUnique({
    where: { id: Number(params.todoId)},
  });

  if (!todo) {
    throw Error("not found");
  }

  return json(todo);
}


// action も loader 同様に prisma から動的セグメントを取得できます。
export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (typeof params.todoId !== "string") {
    throw Error("invalid params")
  }

  const formData = await request.formData();
  const title = formData.get("title")
  const done = formData.get("done") === "完了"

  if (typeof title !== "string") {
    throw Error("incalid type")
  }

  await prisma.todo.update({
    where: { id: Number(params.todoId) },
    data: { title, done },
  })

  return await redirect("/todos")
}

export default function EditTodos() {
  const todo = useLoaderData<typeof loader>()

  return (
  <Form 
    method="post"
    className="flex items-end space-x-4 bg-cyan-200">
      <div>
        <label htmlFor="title">
          タイトル
        </label>
        <Input
          defaultValue={todo.title}
          id="title"
          name="title"
          />
      </div>

      <RadioGroup
        defaultValue={todo.done ? "完了" : "未了"}
        className="flex h-10 "
        name="done"
        >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="未了" id="not-done" />
          <Label htmlFor="not-done">未了</Label>
        </div>
        <div className="flex shrink-0 items-center space-x-2">
          <RadioGroupItem value="完了" id="done" />
          <Label htmlFor="done">完了</Label>
        </div>
      </RadioGroup>

      <Button type="submit">
        更新
      </Button>
    </Form>
  )
}
