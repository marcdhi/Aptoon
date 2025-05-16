import { Button } from '@/components/ui/button';
import { useLikes } from '@/hooks/useLikes';
import { HeartIcon, HeartFilledIcon } from '@radix-ui/react-icons';

interface LikeButtonProps {
  nftAddress: string;
  className?: string;
}

export function LikeButton({ nftAddress, className }: LikeButtonProps) {
  const { likeStatus, isLoading, toggleLike } = useLikes(nftAddress);

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleLike}
      disabled={isLoading}
    >
      {likeStatus.hasLiked ? (
        <HeartFilledIcon className="h-5 w-5 text-red-500" />
      ) : (
        <HeartIcon className="h-5 w-5" />
      )}
      <span className="ml-2">{likeStatus.count}</span>
    </Button>
  );
} 