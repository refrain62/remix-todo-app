// app/routes/todos.new.tsx
import { redirect, type ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { prisma } from "~/db.server";

import { z } from "zod"

// バリデーション用の定義（zodのみ）
const Schema = z.object({
  title: z.string().min(1, { message: "Todo名は必須です。"}),
})

// loader同様、Remixが指定している関数名です。FormコンポーネントないでSubmitされた際に、その内容をもとに呼び出されます。
export const action = async ({ request }: ActionFunctionArgs) => {
  // const formData = await request.formData();
  // リクエストからフォームデータを取得して、オブジェクトとして扱えるように変換
  const formDataObject = Object.fromEntries(await request.formData());

  // safeParseを使用して検証
  const validationResult = Schema.safeParse(formDataObject)

  // バリデーションに失敗したらエラー内容を返す
  if (!validationResult.success) {
    return json({
      validationMessages: validationResult.error.flatten().fieldErrors,
    })
  }

  // stateの管理をしなくても、下記のようにして、 name="title" の値を取得できます。
  const title = String(formDataObject.title);

  await prisma.todo.create({ data: { title, done: false } });
  
  return redirect("/todos")
}

export default function NewTodos() {
  const actionData = useActionData<typeof action>();
  const validationMessages = actionData?.validationMessages;
  const submitting = useNavigation().state === "submitting";

  return (
    <div>
      {/* FormからValidatedFormに変更 */}
      <Form
        method="POST"
        className="flex items-end space-x-4 bg-lime-2">
          <div>
            <Label htmlFor="title">
              todo名
            </Label>
            <Input name="title" id="title" />
            {/* エラー内容を表示 */}
            {validationMessages?.title && (
              <p className="text-sm font-bold text-red-500">
                {validationMessages.title[0]}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="ml-auto bg-blue-500 rounded-lg py-2 px-4 text-white font-bold hover:bg-blue-500/80"
            disabled={submitting}
            >
            {submitting ? "登録中..." : "登録"}
          </Button>
      </Form>
    </div>
  )
}