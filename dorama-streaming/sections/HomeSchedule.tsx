import Link from "next/link";

interface Props {
  dramas: any[];
}

const weekDays = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default function HomeSchedule({
  dramas,
}: Props) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">

      {/* HEADER */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-bold text-white">
            Calendário Semanal
          </h2>

          <p className="text-zinc-400 mt-2">
            Próximos lançamentos da semana
          </p>

        </div>

        <Link
          href="/schedule"
          className="text-purple-400 hover:text-purple-300 transition"
        >
          Ver completo
        </Link>

      </div>

      {/* GRID */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {weekDays.map((day) => {

          const dayDramas = dramas.filter(
            (drama) => drama.scheduleDay === day
          );

          if (dayDramas.length === 0)
            return null;

          return (

            <div
              key={day}
              className="bg-[#18181F] border border-white/5 rounded-3xl p-6"
            >

              {/* DAY */}

              <div className="flex items-center gap-3 mb-6">

                <div className="w-2 h-8 bg-purple-500 rounded-full" />

                <h3 className="text-2xl font-bold text-white">
                  {day}
                </h3>

              </div>

              {/* LIST */}

              <div className="space-y-6">

                {dayDramas.map((drama) => {

                  const latestEpisode =
                    drama.episodes?.[
                      drama.episodes.length - 1
                    ];

                  return (

                    <Link
                      key={drama.id}
                      href={`/watch/${drama.slug}/${latestEpisode?.number}`}
                      className="block group"
                    >

                      <div className="bg-black/20 hover:bg-purple-500/20 transition rounded-2xl p-4">

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <h4 className="font-semibold text-white group-hover:text-purple-300 transition">

                              {drama.title}

                            </h4>

                            <p className="text-zinc-400 text-sm mt-1">

                              EP {latestEpisode?.number}

                            </p>

                          </div>

                          <span className="text-purple-400 text-sm font-semibold whitespace-nowrap">

                            {drama.scheduleDay} às {drama.scheduleTime}

                          </span>

                        </div>

                      </div>

                    </Link>

                  );
                })}

              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}