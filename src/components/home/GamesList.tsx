import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Game section component
function GameSection({ title }: { title: string }) {
  return (
    <div className="game-section mb-4">
      <h3 className="font-semibold">{title}</h3>
      <Link
        href={`/games/${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="see-more"
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
    "LEAGUE OF LEGENDS APLEON COMICS 2",
    "LEAGUE OF LEGENDS APLEON COMICS 3",
    "LEAGUE OF LEGENDS APLEON COMICS 4"
  ];

  return (
    <section className="mb-12">
      <h2 className="section-title">GAMES</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <GameSection key={game} title={game} />
        ))}
      </div>
    </section>
  );
}
