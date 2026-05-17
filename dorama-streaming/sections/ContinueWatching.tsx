import Link from "next/link";

import Image from "next/image";

interface Props {
  items: any[];
}

export default function
ContinueWatchingSection({
  items,
}: Props) {

  return (

    <section className="py-14">

      <div
        className="
          max-w-7xl
          mx-auto
          px-6
        "
      >

        <div className="mb-8">

          <h2
            className="
              text-3xl
              font-black
              mb-2
            "
          >
            Continue Assistindo
          </h2>

          <p className="text-white/60">
            Retome de onde parou
          </p>

        </div>

        <div
          className="
            grid
            sm:grid-cols-2
            lg:grid-cols-4
            gap-6
          "
        >

          {items.map((item) => {

            const progress =
              (
                item.currentTime /
                item.episode.duration
              ) * 100;

            return (

              <Link
                key={item.id}
                href={`/watch/${item.episode.drama.slug}/${item.episode.number}`}
                className="group"
              >

                <div
                  className="
                    bg-[#18181F]
                    border
                    border-white/5
                    hover:border-purple-500/30
                    rounded-3xl
                    overflow-hidden
                    transition
                  "
                >

                  <div
                    className="
                      relative
                      h-64
                      overflow-hidden
                    "
                  >

                    <Image
                      src={
                        item.episode
                          .thumbnail
                      }
                      alt={
                        item.episode
                          .title
                      }
                      fill
                      className="
                        object-cover
                        group-hover:scale-105
                        transition
                        duration-500
                      "
                    />

                  </div>

                  <div className="p-5">

                    <h3
                      className="
                        text-2xl
                        font-bold
                        line-clamp-1
                      "
                    >

                      {
                        item.episode
                          .drama.title
                      }

                    </h3>

                    <p
                      className="
                        text-white/50
                        text-sm
                        mt-1
                      "
                    >

                      Episódio
                      {" "}
                      {
                        item.episode
                          .number
                      }

                    </p>

                    <div className="mt-4">

                      <div
                        className="
                          w-full
                          h-2
                          rounded-full
                          bg-white/10
                          overflow-hidden
                        "
                      >

                        <div
                          className="
                            h-full
                            bg-purple-500
                            rounded-full
                          "
                          style={{
                            width:
                              `${progress}%`,
                          }}
                        />

                      </div>

                      <p
                        className="
                          text-xs
                          text-white/40
                          mt-2
                        "
                      >

                        {
                          Math.floor(
                            progress
                          )
                        }
                        % assistido

                      </p>

                    </div>

                  </div>

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>

  );

}