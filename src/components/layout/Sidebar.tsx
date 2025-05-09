'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    name: "FEED",
    href: "/",
    icon: <Home className="w-5 h-5 mr-2" />,
  },
  {
    name: "CREATE",
    href: "/create",
    icon: <BookOpen className="w-5 h-5 mr-2" />,
  },
  {
    name: "DASHBOARD",
    href: "/dashboard",
    icon: <User className="w-5 h-5 mr-2" />,
  },
  {
    name: "LEADERBOARD",
    href: "/leaderboard",
    icon: <Trophy className="w-5 h-5 mr-2" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sticky top-16 w-full md:w-64 border-r bg-white h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-[2px] transition-colors font-heading font-bold",
                "hover:text-[#C24B41] active:bg-gray-100",
                isActive && "text-[#C24B41]"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
