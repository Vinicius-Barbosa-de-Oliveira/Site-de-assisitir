// app/schedule/page.tsx

import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

import { db } from "@/db/db";

import Link from "next/link";
import Image from "next/image";

export default async function SchedulePage() {
  const dramas = await db.query.dorama.findMany({
    where: (dorama, { eq }) =>
      eq(dorama.status, "Em Lançamento"),

    with: {
      coverImage: true,
      bannerImage: true,
    },

    orderBy: (dorama, { desc }) => [
      desc(dorama.createdAt),
    ],
  });

  const weekDays = [
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
    "Domingo",
  ];

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white overflow-hidden">
      <Navbar />

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/5">
        {/* BACKGROUND */}

        {dramas[0]?.bannerImage?.url && (
          <Image
            src={dramas[0].bannerImage.url}
            alt={dramas[0].title}
            fill
            priority
            className="object-cover opacity-15"
          />
        )}

        {/* OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/40 via-[#0B0B0F]/90 to-[#0B0B0F]" />

        {/* GLOW */}

        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[350px]
            bg-purple-500/20
            blur-[140px]
          "
        />

        {/* CONTENT */}

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            {/* BADGE */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-purple-500/20
                bg-purple-500/10
                px-4
                py-2
                text-sm
                text-purple-300
                backdrop-blur-xl
              "
            >
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />

              Atualizações Semanais
            </div>

            {/* TITLE */}

            <h1
              className="
                mt-6
                text-5xl
                md:text-6xl
                font-black
                tracking-tight
                leading-tight
              "
            >
              Calendário de
              <span className="text-purple-500">
                {" "}
                Lançamentos
              </span>
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                mt-6
                text-zinc-400
                text-lg
                leading-relaxed
                max-w-2xl
              "
            >
              Acompanhe os doramas que estão
              atualmente em lançamento e veja
              quais episódios chegam a cada dia
              da semana.
            </p>

            {/* STATS */}

            <div className="flex flex-wrap gap-4 mt-10">
              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <p className="text-2xl font-black">
                  {dramas.length}
                </p>

                <span className="text-sm text-zinc-400">
                  Em lançamento
                </span>
              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  py-4
                  backdrop-blur-xl
                "
              >
                <p className="text-2xl font-black">
                  7
                </p>

                <span className="text-sm text-zinc-400">
                  Dias da semana
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-14 space-y-14">
        {weekDays.map((day) => {
          const dramasOfDay =
            dramas.filter(
              (dorama) =>
                dorama.scheduleDay === day
            );

          return (
            <div key={day}>
              {/* HEADER */}

              <div className="flex items-center gap-4 mb-6">
                <div className="w-1.5 h-8 rounded-full bg-purple-500" />

                <h2 className="text-2xl md:text-3xl font-black">
                  {day}
                </h2>

                <span className="text-sm text-zinc-500">
                  (
                  {dramasOfDay.length}
                  )
                </span>

                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* GRID */}

              {dramasOfDay.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-2
                    sm:grid-cols-3
                    md:grid-cols-4
                    lg:grid-cols-5
                    xl:grid-cols-6
                    gap-5
                  "
                >
                  {dramasOfDay.map(
                    (dorama) => (
                      <Link
                        key={dorama.id}
                        href={`/dorama/${dorama.slug}`}
                        className="group"
                      >
                        <div
                          className="
                            overflow-hidden
                            rounded-2xl
                            border
                            border-white/5
                            bg-[#18181F]
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:border-purple-500/30
                          "
                        >
                          {/* IMAGE */}

                          <div className="relative aspect-[2/3] overflow-hidden">
                            <Image
                              src={
                                dorama
                                  .coverImage
                                  ?.url ||
                                "/placeholder.jpg"
                              }
                              alt={
                                dorama.title
                              }
                              fill
                              className="
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                            />

                            <div
                              className="
                                absolute
                                inset-0
                                bg-gradient-to-t
                                from-black/80
                                via-transparent
                                to-transparent
                              "
                            />

                            {/* BADGE */}

                            <div
                              className="
                                absolute
                                top-3
                                right-3
                                rounded-full
                                bg-purple-500
                                px-2.5
                                py-1
                                text-[10px]
                                font-bold
                              "
                            >
                              NOVO
                            </div>
                          </div>

                          {/* INFO */}

                          <div className="p-4">
                            <h3
                              className="
                                font-bold
                                text-sm
                                line-clamp-1
                              "
                            >
                              {dorama.title}
                            </h3>

                            <div
                              className="
                                flex
                                items-center
                                justify-between
                                mt-2
                                text-xs
                                text-zinc-400
                              "
                            >
                              <span>
                                {
                                  dorama.year
                                }
                              </span>

                              <span className="text-yellow-300">
                                ★{" "}
                                {Number(
                                  dorama.popularityScore
                                ).toFixed(
                                  1
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              ) : (
                <div
                  className="
                    rounded-2xl
                    border
                    border-white/5
                    bg-[#18181F]
                    p-8
                    text-center
                  "
                >
                  <p className="text-zinc-500">
                    Nenhum lançamento
                    neste dia.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <Footer />
    </main>
  );
}