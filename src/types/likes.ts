export interface Like {
  id: string;
  nft_address: string;
  liker_address: string;
  signature: string;
  created_at: string;
}

export interface LikeCount {
  nft_address: string;
  count: number;
}

export interface LikeStatus {
  hasLiked: boolean;
  count: number;
} 