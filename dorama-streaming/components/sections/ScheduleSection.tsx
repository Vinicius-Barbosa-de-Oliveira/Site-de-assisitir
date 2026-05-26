"use client";

import Link from "next/link";

type ScheduleDrama = {
  id: string;
  title: string;
  slug: string;
  image: string;
  nextEpisode?: number;
  releaseDay?: string;
  releaseTime?: string;
};

type Props = {
  dramas: ScheduleDrama[];
};

export default function ScheduleSection({
  dramas,
}: Props) {
  const grouped = dramas.reduce(
    (acc, drama) => {
      const day =
        drama.releaseDay || "Sem data";

      if (!acc[day]) {
        acc[day] = [];
      }

      acc[day].push(drama);

      return acc;
    },
    {} as Record<string, ScheduleDrama[]>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      <div className="mb-10">
        <h1 className="text-5xl font-black">
          Calendário
        </h1>

        <p className="text-zinc-400 mt-3">
          Doramas em lançamento
        </p>
      </div>

      <div className="space-y-14">
        {Object.entries(grouped).map(
          ([day, dramas]) => (
            <div key={day}>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-white/10" />

                <h2 className="text-2xl font-bold whitespace-nowrap">
                  {day}
                </h2>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {dramas.map((dorama) => (
                  <Link
                    key={dorama.id}
                    href={`/dorama/${dorama.slug}`}
                    className="
                      group
                      bg-[#18181F]
                      border
                      border-white/10
                      rounded-3xl
                      overflow-hidden
                      transition
                      hover:border-purple-500/40
                    "
                  >
                    <div className="relative aspect-2/3 overflow-hidden">
                      <img
                        src={dorama.image}
                        alt={dorama.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />

                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold line-clamp-1">
                        {dorama.title}
                      </h3>

                      <div className="mt-3 flex items-center justify-between text-sm">
                        <span className="text-purple-400">
                          EP {dorama.nextEpisode}
                        </span>

                        <span className="text-zinc-500">
                          {dorama.releaseTime}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}