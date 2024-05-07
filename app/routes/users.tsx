import { Separator } from "@radix-ui/react-separator"
import { Outlet } from "@remix-run/react"
import { Table, TableHead, TableHeader } from "@/components/ui/table"

export default function Users() {
  return (
    <div className="bg-green-400">
      <h1 className="text-2x1 font-bold">
        Users ページ
      </h1>

      <Separator className="mb-4 mt-2 border-2 border-gray-400" />

      {/* 一覧のみのため、共通させる必要がない＆データ取得に関する領域を最小限にするため、TableHeaderまで users.tsx に記述 */}
      <Table>
        <TableHeader>
          <TableHead>名前</TableHead>
          <TableHead>ユーザ名</TableHead>
        </TableHeader>

        <Outlet />
      </Table>
    </div>
  )
}
