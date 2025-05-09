import Link from "next/link";
import { Home, BookOpen, User, Trophy } from "lucide-react";

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
  return (
    <div className="sticky top-16 w-full md:w-64 border-r bg-white h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center p-2 hover:bg-gray-100 rounded-md transition-colors font-semibold"
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
