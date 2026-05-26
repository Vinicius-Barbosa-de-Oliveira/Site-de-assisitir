import {
  Heart,
  Play,
  Bookmark,
} from "lucide-react";

import StatCard from "./stat-card";

interface Props {
  favorites: number;
  watching: number;
  completed: number;
}

export default function ProfileStats({
  favorites,
  watching,
  completed,
}: Props) {
  return (
    <section className="py-14">
      <div
        className="
          mx-auto
          grid
          max-w-7xl
          gap-6
          px-6
          sm:grid-cols-2
          lg:grid-cols-3
        "
      >
        <StatCard
          title="Favoritos"
          value={favorites}
          icon={<Heart size={24} />}
        />

        <StatCard
          title="Assistindo"
          value={watching}
          icon={<Play size={24} />}
        />

        <StatCard
          title="Concluídos"
          value={completed}
          icon={<Bookmark size={24} />}
        />
      </div>
    </section>
  );
}