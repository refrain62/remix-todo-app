import { Link } from "@remix-run/react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"
import { Variable } from "lucide-react";

const sideBarNavItems: {
  title: string;
  href: string;
}[] = [
  {
    title: "TODO",
    href: "/todos",
  },
  {
    title: "ユーザー",
    href: "/users",
  },
];

export const SideBarNav = () => {
  return (
    <nav className="flex flex-col gap-2">
      {sideBarNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({
              variant: "ghost",
            }),
            "flex justify-start text-lg"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
};
