import Image from 'next/image';
import Link from 'next/link';
import { Share2 } from 'lucide-react';

interface SuccessMessageProps {
  explorerUrl?: string;
  metaplexUrl?: string;
}

export function SuccessMessage({ explorerUrl, metaplexUrl }: SuccessMessageProps) {
  return (
    <div className="text-center space-y-6 py-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-heading font-bold text-[#2A9D8F]">Success!</h2>
        <p className="text-xl">Your comic has been published as an NFT!</p>
      </div>

      {(explorerUrl || metaplexUrl) && (
        <div className="space-y-4">
          <p className="text-gray-600">View your NFT:</p>
          <div className="flex flex-col gap-3">
            {explorerUrl && (
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aptoon"
              >
                VIEW ON SOLANA EXPLORER
              </a>
            )}
            {metaplexUrl && (
              <a
                href={metaplexUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-aptoon"
              >
                VIEW ON METAPLEX
              </a>
            )}
          </div>
        </div>
      )}

      <div className="pt-8">
        <a href="/" className="btn-aptoon">
          BACK TO HOME
        </a>
      </div>
    </div>
  );
} 