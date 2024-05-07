import { NavLink } from "@remix-run/react";
import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

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
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: "ghost",
              }),
              // アクティブリンクの時は背景色を濃くして表示します。
              isActive && "bg-red-300",
              "flex justify-start text-lg"
            )
          }
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};
