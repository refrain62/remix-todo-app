// app/routes/todos.new.tsx
import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "~/db.server";

// loader同様、Remixが指定している関数名です。FormコンポーネントないでSubmitされた際に、その内容をもとに呼び出されます。
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  // stateの管理をしなくても、下記のようにして、 name="title" の値を取得できます。
  const title = formData.get("title");

  // 本来バリデーション実装も必要ですが、今回は割愛し、型が違う場合のみ、エラーをスローする
  if (typeof title !== "string") {
    throw Error("invalid type")
  }

  await prisma.todo.create({ data: { title, done: false } });
  
  return redirect("/todos")
}

export default function NewTodos() {
  return (
    <div>
      <Form
        method="post"
        className="flex items-end space-x-4 bg-lime-2">
          <div>
            <Label htmlFor="title">
              todo名
            </Label>
            <Input name="title" id="title" />
          </div>
          <Button type="submit">
            作成
          </Button>
      </Form>
    </div>
  )
}