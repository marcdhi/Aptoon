import Image from 'next/image';
import { Heart, MessageSquare, Share2, Eye } from 'lucide-react';

export function ReviewComic() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[2px] border border-black p-6">
        {/* Comic Preview Header */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold">TITLE GOES HERE</h3>
          <p className="text-gray-600">Description goes here</p>
        </div>

        {/* Stats Bar - Static with reduced opacity */}
        <div className="flex items-center mb-4 space-x-4 opacity-50">
          <div className="flex items-center text-[#C24B41]">
            <Heart className="w-5 h-5 mr-1" />
            <span>102</span>
          </div>
          <div className="flex items-center">
            <MessageSquare className="w-5 h-5 mr-1" />
            <span>45</span>
          </div>
          <div className="flex items-center">
            <Share2 className="w-5 h-5 mr-1" />
          </div>
          <div className="flex items-center ml-auto">
            <Eye className="w-5 h-5 mr-1" />
            <span>102</span>
          </div>
        </div>

        {/* Comic Image */}
        <div className="relative aspect-video bg-gray-100 rounded-[2px] overflow-hidden">
          <Image
            src="/images/comic-panel.jpg"
            alt="Comic Preview"
            fill
            className="object-cover"
          />
          {/* Red progress bar */}
          <div className="absolute bottom-0 left-0 w-full h-1">
            <div className="w-1/3 h-full bg-[#C24B41]" />
          </div>
        </div>

        {/* User Info - Static with reduced opacity */}
        <div className="mt-4 space-y-4 opacity-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/images/profile.jpg"
                alt="User Avatar"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-bold">USERNAME</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              <Image
                src="/images/game-icon.jpg"
                alt="Game Icon"
                width={40}
                height={40}
              />
            </div>
            <div>
              <p className="font-bold">GAME NAME: LEVEL 1</p>
            </div>
          </div>
        </div>

        {/* Network Icons - Static with reduced opacity */}
        <div className="flex gap-2 mt-4 opacity-50">
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-8 h-8 rounded-full bg-gray-200" />
          <div className="w-8 h-8 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
} 