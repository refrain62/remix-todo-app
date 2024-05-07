import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

export const loader = async () => {
  // APIを呼ぶ場合はfetch()で呼び出す
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // 型については本題ではないので手抜きする
  const users = (await res.json()) as {
    id: string;
    name: string;
    username: string;
  }[];

  return json(users);
}

export default function UserIndex() {
  const users = useLoaderData<typeof loader>();

  return (
    <TableBody className="bg-purple-100">
      {users.map((user) => (
        <TableRow key={user.id}>
          <TableCell>{user.name}</TableCell>
          <TableCell>{user.username}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
