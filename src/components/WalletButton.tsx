"use client";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export const WalletButton = () => {
  return (
    <div>
      <WalletMultiButton className="btn-aptoon !bg-white !border !border-black !rounded-[1px] !h-[40px] !px-4 !font-heading !text-black hover:!text-[#C24B41]" />
    </div>
  );
}; 