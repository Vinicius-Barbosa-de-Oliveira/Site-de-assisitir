import Link from "next/link";
import Image from "next/image";

import { getAllDramas } from "@/lib/data";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const weekDays = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default async function SchedulePage() {

  const dramas = await getAllDramas();

  return (
    <main className="min-h-screen bg-[#07070A] text-white">

      <Navbar />

      <div className="flex items-start justify-between mb-14">

        <div>

          <h1 className="text-5xl font-black text-white">
            Calendário Semanal
          </h1>

          <p className="text-zinc-400 mt-3">
            Próximos lançamentos da semana
          </p>

        </div>

        <Link
          href="/"
          className="text-purple-400 hover:text-purple-300 transition"
        >
          Voltar
        </Link>

      </div>

      {/* DAYS */}

      <div className="space-y-20">

        {weekDays.map((day) => {

          const dayDramas = dramas.filter(
            (drama: any) =>
              drama.scheduleDay === day
          );

          if (dayDramas.length === 0)
            return null;

          return (

            <section key={day}>

              {/* DAY TITLE */}

              <div className="flex items-center gap-4 mb-8">

                <div className="w-2 h-10 rounded-full bg-purple-500" />

                <div>

                  <h2 className="text-4xl font-bold text-white">
                    {day}
                  </h2>

                  <p className="text-zinc-500 text-sm mt-1">
                    {dayDramas.length} doramas lançando
                  </p>

                </div>

              </div>

              {/* GRID */}

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {dayDramas.map((drama: any) => {

                  const latestEpisode =
                    drama.episodes?.[
                      drama.episodes.length - 1
                    ];

                  return (

                    <Link
                      key={drama.id}
                      href={`/drama/${drama.slug}`}
                      className="group"
                    >

                      <div className="relative h-105 overflow-hidden rounded-3xl border border-white/5 bg-zinc-900">

                        {/* IMAGE */}

                        <Image
                          src={drama.bannerImage}
                          alt={drama.title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                        />

                        {/* OVERLAY */}

                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                        {/* CONTENT */}

                        <div className="absolute inset-0 p-7 flex flex-col justify-between">

                          {/* TOP */}

                          <div className="flex items-start justify-between">

                            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">

                              {day}

                            </span>

                            <span className="text-sm font-semibold text-purple-300">

                              {drama.scheduleTime}

                            </span>

                          </div>

                          {/* BOTTOM */}

                          <div>

                            <h2 className="text-4xl font-black leading-tight text-white group-hover:text-purple-300 transition">

                              {drama.title}

                            </h2>

                            <p className="text-zinc-300 mt-4 line-clamp-3 text-sm leading-relaxed">

                              {drama.description}

                            </p>

                            <div className="flex items-center justify-between mt-8">

                              <span className="text-zinc-300 font-semibold">

                                EP {latestEpisode?.number}

                              </span>

                              <span className="text-yellow-400 font-bold">

                                ⭐ {drama.rating}

                              </span>

                            </div>

                          </div>

                        </div>

                      </div>

                    </Link>

                  );
                })}

              </div>

            </section>

          );
        })}

      </div>

      <Footer />

    </main>
  );
}