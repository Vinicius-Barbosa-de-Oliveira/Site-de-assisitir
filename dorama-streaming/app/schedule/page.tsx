import Link from "next/link";

import Image from "next/image";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import {
  getScheduleDramas,
} from "@/app/services/dramas";

const weekDays = [
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
  "Domingo",
];

export default async function
SchedulePage() {

  const dramas =
    await getScheduleDramas();

  // ORGANIZA POR DIA

  const dramasByDay =
    weekDays.reduce(
      (acc, day) => {

        acc[day] =
          dramas.filter(
            (drama) =>
              drama.scheduleDay ===
              day
          );

        return acc;

      },
      {} as Record<
        string,
        typeof dramas
      >
    );

  return (

    <main
      className="
        bg-[#0F0F14]
        min-h-screen
        text-white
      "
    >

      <Navbar />

      {/* HERO */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-white/10
        "
      >

        <div
          className="
            absolute
            inset-0
            bg-linear-to-r
            from-purple-500/20
            to-transparent
          "
        />

        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            py-24
            relative
            z-10
          "
        >

          <span
            className="
              bg-purple-500
              px-4
              py-2
              rounded-full
              text-sm
            "
          >
            lançamentos da semana
          </span>

          <h1
            className="
              text-6xl
              font-black
              mt-6
            "
          >
            Calendário
          </h1>

          <p
            className="
              text-zinc-400
              text-lg
              mt-6
              max-w-2xl
            "
          >
            Fique por dentro
            dos próximos episódios
            que serão lançados
          </p>

        </div>

      </section>

      {/* CALENDAR */}

      <section
        className="
          max-w-7xl
          mx-auto
          px-6
          py-16
        "
      >

        <div className="space-y-20">

          {weekDays.map((day) => {

            const dayDramas =
              dramasByDay[day];

            if (
              !dayDramas ||
              dayDramas.length === 0
            ) {
              return null;
            }

            return (

              <div key={day}>

                {/* DAY */}

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    mb-10
                  "
                >

                  <div
                    className="
                      w-3
                      h-12
                      bg-purple-500
                      rounded-full
                    "
                  />

                  <h2
                    className="
                      text-4xl
                      font-bold
                    "
                  >
                    {day}
                  </h2>

                </div>

                {/* GRID */}

                <div
                  className="
                    grid
                    sm:grid-cols-2
                    lg:grid-cols-3
                    xl:grid-cols-4
                    gap-8
                    items-stretch
                  "
                >

                  {dayDramas.map(
                    (drama) => {

                      const latestEpisode =
                        drama.episodes?.[
                          drama
                            .episodes
                            .length - 1
                        ];

                      return (

                        <Link
                          key={drama.id}
                          href={`/drama/${drama.slug}`}
                          className="group h-full"
                        >

                          <div
                            className="
                              bg-[#18181F]
                              rounded-3xl
                              overflow-hidden
                              border
                              border-white/5
                              hover:border-purple-500/20
                              transition
                              h-full
                              flex
                              flex-col
                            "
                          >

                            {/* IMAGE */}

                            <div
                              className="
                                relative
                                h-80
                                overflow-hidden
                                shrink-0
                              "
                            >

                              <Image
                                src={
                                  drama.coverImage
                                }
                                alt={
                                  drama.title
                                }
                                fill
                                className="
                                  object-cover
                                  group-hover:scale-110
                                  transition
                                  duration-500
                                "
                              />

                              <div
                                className="
                                  absolute
                                  inset-0
                                  bg-linear-to-t
                                  from-black
                                  via-black/20
                                  to-transparent
                                "
                              />

                              {/* TIME */}

                              <div
                                className="
                                  absolute
                                  top-4
                                  right-4
                                  bg-purple-500
                                  px-4
                                  py-2
                                  rounded-full
                                  text-sm
                                  font-bold
                                "
                              >

                                {
                                  drama.scheduleTime
                                }

                              </div>

                              {/* EP */}

                              {latestEpisode && (

                                <div
                                  className="
                                    absolute
                                    bottom-4
                                    left-4
                                  "
                                >

                                  <span
                                    className="
                                      bg-black/50
                                      backdrop-blur-xl
                                      px-4
                                      py-2
                                      rounded-full
                                      text-sm
                                    "
                                  >

                                    EP
                                    {" "}
                                    {
                                      latestEpisode.number
                                    }

                                  </span>

                                </div>

                              )}

                            </div>

                            {/* CONTENT */}

                            <div
                              className="
                                p-6
                                flex
                                flex-col
                                flex-1
                              "
                            >

                              <div
                                className="
                                  flex
                                  items-start
                                  justify-between
                                  gap-4
                                "
                              >

                                <div
                                  className="
                                    flex-1
                                  "
                                >

                                  <h3
                                    className="
                                      text-2xl
                                      font-bold
                                      line-clamp-2
                                      min-h-16
                                    "
                                  >

                                    {drama.title}

                                  </h3>

                                  <p
                                    className="
                                      text-zinc-400
                                      mt-2
                                      text-sm
                                    "
                                  >

                                    {
                                      drama.country
                                    }
                                    {" • "}
                                    {
                                      drama.year
                                    }

                                  </p>

                                </div>

                                <div
                                  className="
                                    bg-purple-500/20
                                    text-purple-400
                                    px-3
                                    py-1
                                    rounded-xl
                                    text-sm
                                    font-semibold
                                    shrink-0
                                  "
                                >

                                  ⭐ {drama.rating}

                                </div>

                              </div>

                              <div
                                className="
                                  flex
                                  flex-wrap
                                  gap-2
                                  mt-5
                                "
                              >

                                <span
                                  className="
                                    bg-black/20
                                    px-3
                                    py-2
                                    rounded-xl
                                    text-sm
                                    text-zinc-300
                                  "
                                >

                                  {drama.status}

                                </span>

                              </div>

                              <p
                                className="
                                  text-zinc-400
                                  text-sm
                                  leading-7
                                  mt-5
                                  line-clamp-3
                                  min-h-21
                                "
                              >

                                {
                                  drama.description
                                }

                              </p>

                            </div>

                          </div>

                        </Link>

                      );

                    }
                  )}

                </div>

              </div>

            );

          })}

        </div>

      </section>

      <Footer />

    </main>

  );

}