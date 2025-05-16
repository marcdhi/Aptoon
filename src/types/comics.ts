export interface Comic {
  id: string;
  nft_address: string;
  title: string;
  description: string;
  image_url: string;
  creator_address: string;
  created_at: string;
  metadata: {
    attributes?: Array<{
      trait_type: string;
      value: string;
    }>;
  };
}

export interface ComicWithStats extends Comic {
  likes: number;
  comments: number;
} 