import { NavLink } from "@remix-run/react";
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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
    <div className="flex flex-col gap-2">
      <nav>
        {sideBarNavItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                buttonVariants({ variant: "ghost" }),
                "flex justify-start text-lg",
                // アクティブリンクの時は背景色を濃くして表示します。
                isActive && "bg-red-300",
              )
            }
          >
            {item.title}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
