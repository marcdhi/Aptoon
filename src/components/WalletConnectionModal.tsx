'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { WalletButton } from "./WalletButton";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";

interface WalletConnectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WalletConnectionModal({ isOpen, onClose }: WalletConnectionModalProps) {
  const { connected } = useWallet();

  // Close modal when wallet gets connected
  useEffect(() => {
    if (connected) {
      onClose();
    }
  }, [connected, onClose]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center font-heading">CONNECT YOUR WALLET</DialogTitle>
          <DialogDescription className="text-center">
            Connect your wallet to start creating comics
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-6 py-4">
          <Image
            src="/images/icons/wallet.svg"
            alt="Wallet"
            width={64}
            height={64}
            className="w-16 h-16"
          />
          <div onClick={onClose}>
            <WalletButton />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 