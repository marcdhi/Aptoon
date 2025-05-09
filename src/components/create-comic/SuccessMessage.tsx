import Image from 'next/image';
import Link from 'next/link';
import { Share2 } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="w-full max-w-4xl mx-auto min-h-[60vh] flex flex-col items-center justify-center space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-heading font-bold text-[#2A9D8F]">CONGRATULATIONS!</h1>
        <p className="text-gray-600">You successfully published your comic!</p>
      </div>

      {/* Success Animation */}
      <div className="relative w-64 h-64">
        <Image
          src="/images/aptoon-success.gif"
          alt="Success Animation"
          fill
          className="object-contain"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button className="btn-aptoon">
          <Share2 className="w-5 h-5 mr-2" />
          SHARE YOUR COMIC
        </button>
        
        <Link href="/comic/latest" className="text-[#2A9D8F] hover:underline">
          VIEW THE COMIC
        </Link>
        
        <Link href="/explore" className="text-gray-600 hover:underline">
          EXPLORE MORE COMICS
        </Link>
      </div>
    </div>
  );
} 