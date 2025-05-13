import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Game section component
function GameSection({ title, isWide }: { title: string; isWide: boolean }) {
  return (
    <div 
      className={`game-section relative border border-gray-200 rounded-lg p-4 flex justify-between items-center ${
        isWide ? 'col-span-2' : 'col-span-1'
      }`}
    >
      <h3 className="font-semibold text-lg truncate pr-16">{title}</h3>
      <Link
        href={`/games/${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="absolute right-4 flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
      >
        SEE MORE
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export function GamesList() {
  const games = [
    "LEAGUE OF LEGENDS APLEON COMICS",
    "LEAGUE OF LEGENDS APLEON CO...",
    "LEAGUE OF LEGENDS APLEON CO...",
    "LEAGUE OF LEGENDS APLEON COMICS",
    "LEAGUE OF LEGENDS APLEON COMICS",
    "LEAGUE OF LEGENDS APLEON CO..."
  ];

  return (
    <section className="mb-12">
      <h2 className="section-title mb-6">GAMES</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game, index) => (
          <GameSection 
            key={game} 
            title={game} 
            isWide={index % 3 === 0 || index % 3 === 2}
          />
        ))}
      </div>
    </section>
  );
}
