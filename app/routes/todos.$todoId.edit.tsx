// app/routes/todos.$todoId.edit.tsx
import { Label } from "@radix-ui/react-label";

import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useActionData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { prisma } from "~/db.server";

import { ValidatedForm, validationError, useField, useFormContext } from "remix-validated-form";
import { FC } from "react";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

// バリデート定義
export const todoRegisterValidator = withZod(
  z.object({
    title: z.string()
      .min(1, { message: "Todo名は必須です。"})
      .max(10, { message: "Todo名は10文字以内で入力してください" }),
    done: z.string()
      .min(1, { message: "Todoの状態を選択してください。"}),
  })
)

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
  // リクエストの内容を取得
  const formData = await todoRegisterValidator.validate(
    await request.formData()
  );
  
  // リクエストの内容を検証
  if (typeof params.todoId !== "string") {
    throw Error("invalid params")
  }

  if (formData.error) {
    console.log({formData})
    return  validationError(formData.error)
  }

  const title = formData.data.title
  const done = formData.data.done === "完了"

  if (typeof title !== "string") {
    throw Error("invalid type")
  }

  // データの更新
  await prisma.todo.update({
    where: { id: Number(params.todoId) },
    data: { title, done },
  })

  return await redirect("/todos")
}

// エラー表示用
const ErrorMessage: FC<{ error?: string }> = ({ error }) => {
  return <div className="text-red-500">{error}</div>;
};

export default function EditTodos() {
  const todo = useLoaderData<typeof loader>()

  const formContext = useFormContext("fT");
  const props = { formId: "fT" };

  // 何を取得するかを指定して分割代入する(ここではエラー内容)
  // https://www.remix-validated-form.io/reference/use-field#touched
  const { error: titleError } = useField("title", props);
  const { error: doneError } = useField("done", props);

  return (
  <ValidatedForm 
    method="post"
    className="flex items-end space-x-4 bg-cyan-200"
    validator={todoRegisterValidator}
    id="fT"
    >
      <div>
        <label htmlFor="title">
          タイトル
        </label>
        {/* エラー内容はカスタムコンポーネント内で処理している */}
        <Input
          defaultValue={todo.title}
          id="title"
          name="title"
          />
          {/* エラー内容を表示 */}
          <ErrorMessage error={titleError} />
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
      {/* エラー内容を表示 */}
      <ErrorMessage error={doneError} />

      <Button
        type="submit" 
        className="ml-auto bg-blue-500 rounded-lg py-2 px-4 text-white font-bold hover:bg-blue-500/80"
        >
        更新
      </Button>
    </ValidatedForm>
  )
}
