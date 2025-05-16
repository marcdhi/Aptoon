'use client';

interface UserActivityProps {
  publicKey: string;
}

export function UserActivity({ publicKey }: UserActivityProps) {
  return (
    <div className="bg-white rounded-[2px] border border-black shadow-[2px_-2px_0px_0px_#000000] p-6">
      <div className="text-center py-8">
        <p className="text-gray-500">Activity tracking coming soon!</p>
        <p className="text-sm text-gray-400 mt-2">We'll track your minting and trading activity here.</p>
      </div>
    </div>
  );
} 