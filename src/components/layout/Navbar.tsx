"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Bell, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletButton } from "@/components/WalletButton";

export function Navbar() {
  const { connected } = useWallet();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/icons/logo.svg"
            alt="Aptoon"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>

        {/* Search */}
        <div className="relative hidden md:flex items-center max-w-xs w-full mx-4">
          <Search className="absolute left-3 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
          />
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <WalletButton />
            {connected && (
              <Link href="/create">
                <button className="btn-aptoon font-heading">
                  <span>CREATE COMIC</span>
                  <Plus className="h-4 w-4" />
                </button>
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Bell className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
