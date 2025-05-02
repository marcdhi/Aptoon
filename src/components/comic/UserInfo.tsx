import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserInfoProps {
  username: string;
  gameName: string;
  gameLevel: number;
  avatarSrc: string;
}

export function UserInfo({ username, gameName, gameLevel, avatarSrc }: UserInfoProps) {
  return (
    <div className="mt-6 space-y-4">
      {/* User info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarSrc} alt={username} />
          <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold">{username}</div>
        </div>
      </div>

      {/* Game info */}
      <div className="flex items-center gap-3">
        <Avatar className="w-12 h-12">
          <AvatarImage src={avatarSrc} alt={gameName} />
          <AvatarFallback>{gameName.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold">{gameName}: LEVEL {gameLevel}</div>
        </div>
      </div>

      {/* Network icons */}
      <div className="flex gap-2 mt-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}
