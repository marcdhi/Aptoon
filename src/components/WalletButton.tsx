"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Loader2, User, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export const WalletButton = () => {
  const { connected, connecting, publicKey, disconnect } = useWallet();
  const { setVisible } = useWalletModal();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleConnect = () => {
    if (!connected) {
      setVisible(true);
    }
  };

  // Format wallet address
  const formattedAddress = publicKey 
    ? `${publicKey.toBase58().slice(0, 4)}...${publicKey.toBase58().slice(-4)}`
    : "";

  return (
    <div className="relative">
      <button
        onClick={connected ? () => setShowDropdown(!showDropdown) : handleConnect}
        disabled={connecting}
        className="btn-aptoon font-heading min-w-[180px] flex items-center justify-center"
      >
        {connecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="ml-2">Connecting...</span>
          </>
        ) : connected ? (
          <>
            <span>{formattedAddress}</span>
          </>
        ) : (
          <>
            <Image 
              src="/images/icons/wallet.svg" 
              alt="Connect Wallet"
              width={20}
              height={20}
              className="w-5 h-5"
            />
            <span className="ml-2">Connect</span>
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {connected && showDropdown && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-black rounded-[1px] shadow-[2px_-2px_0px_0px_#000000] py-1 z-50">
          <button 
            onClick={() => {
              setShowDropdown(false);
              // Add profile view logic here
            }}
            className="w-full px-4 py-2 text-left flex items-center hover:bg-[#F2F2F2] hover:text-[#C24B41] transition-colors"
          >
            <User className="h-4 w-4 mr-2" />
            View Profile
          </button>
          <button 
            onClick={() => {
              disconnect();
              setShowDropdown(false);
            }}
            className="w-full px-4 py-2 text-left flex items-center hover:bg-[#F2F2F2] hover:text-[#C24B41] transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}; 