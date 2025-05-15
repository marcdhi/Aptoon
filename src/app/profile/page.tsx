'use client';

import { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/navigation';
import { SiteLayout } from '@/components/layout/SiteLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserNFTGrid } from '@/components/profile/UserNFTGrid';
import { UserStats } from '@/components/profile/UserStats';
import { UserActivity } from '@/components/profile/UserActivity';

export default function ProfilePage() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!connected) {
      router.push('/');
    }
  }, [connected, router]);

  if (!connected || !publicKey) {
    return null;
  }

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Profile Header */}
          <div className="text-center space-y-4">
            <h1 className="featured-title">MY PROFILE</h1>
            <p className="text-gray-600">View and manage your comic NFTs</p>
          </div>

          {/* User Stats */}
          <UserStats publicKey={publicKey.toString()} />

          {/* Tabs */}
          <Tabs defaultValue="nfts" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="nfts">My NFTs</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="nfts">
              <UserNFTGrid publicKey={publicKey.toString()} />
            </TabsContent>

            <TabsContent value="activity">
              <UserActivity publicKey={publicKey.toString()} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </SiteLayout>
  );
} 