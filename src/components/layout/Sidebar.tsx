'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import { WalletConnectionModal } from "@/components/WalletConnectionModal";

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
    requiresAuth: true,
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
  const { connected } = useWallet();
  const [showWalletModal, setShowWalletModal] = useState(false);

  const handleNavClick = (item: typeof navItems[0], e: React.MouseEvent) => {
    if (item.requiresAuth && !connected) {
      e.preventDefault();
      setShowWalletModal(true);
    }
  };

  return (
    <div className="w-full md:w-64 border-r bg-white h-[calc(100vh-4rem)] overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(item, e)}
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

      <WalletConnectionModal 
        isOpen={showWalletModal} 
        onClose={() => setShowWalletModal(false)} 
      />
    </div>
  );
}
