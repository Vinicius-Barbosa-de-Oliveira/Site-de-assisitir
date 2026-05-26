"use client";

import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Mousewheel,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

type Drama = {
  id: string;

  title: string;

  slug: string;

  year: number;

  popularityScore: number | null;

  coverImage?: {
    url: string;
  } | null;

  status?: string | null;
};

type Props = {
  title: string;

  dramas: Drama[];
};

export default function DoramaCarousel({
  title,
  dramas,
}: Props) {
  return (
    <section className="space-y-8">
      {/* HEADER */}

      <div className="flex items-center gap-4">
        <div
          className="
            h-8
            w-2
            rounded-full
            bg-purple-500
          "
        />

        <h2
          className="
            text-3xl
            font-black
            tracking-tight
          "
        >
          {title}
        </h2>
      </div>

      {/* CAROUSEL */}

      <Swiper
        modules={[
          Navigation,
          Mousewheel,
        ]}
        navigation
        mousewheel
        loop
        speed={800}
        spaceBetween={24}
        slidesPerView={2}
        className="
          cursor-grab
          active:cursor-grabbing
          px-1
          pb-8
        "
        breakpoints={{
          640: {
            slidesPerView: 3,
          },

          1024: {
            slidesPerView: 4,
          },

          1280: {
            slidesPerView: 5,
          },

          1536: {
            slidesPerView: 6,
          },
        }}
      >
        {dramas.map((dorama) => (
          <SwiperSlide
            key={dorama.id}
          >
            <Link
              href={`/dorama/${dorama.slug}`}
              className="group block"
            >
              <div
                className="
                  rounded-3xl
                  overflow-visible
                  border
                  border-white/10
                  bg-[#15151D]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-purple-500/40
                  hover:shadow-[0_0_50px_rgba(168,85,247,0.15)]
                "
              >
                {/* IMAGE */}

                <div
                  className="
                    relative
                    aspect-2/3
                    overflow-hidden
                    rounded-t-3xl
                  "
                >
                  <Image
                    src={
                      dorama.coverImage
                        ?.url ||
                      "/placeholder.jpg"
                    }
                    alt={dorama.title}
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  {/* OVERLAY */}

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

                  {/* STATUS */}

                  {dorama.status && (
                    <div
                      className="
                        absolute
                        top-4
                        right-4
                        rounded-full
                        bg-purple-500
                        px-3
                        py-1
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        shadow-purple-500/30
                      "
                    >
                      {dorama.status}
                    </div>
                  )}

                  {/* PLAY BUTTON */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      opacity-0
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  >
                    <div
                      className="
                        flex
                        h-18
                        w-18
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-white/10
                        text-2xl
                        backdrop-blur-xl
                      "
                    >
                      ▶
                    </div>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-5">
                  <h3
                    className="
                      line-clamp-1
                      text-lg
                      font-bold
                      text-white
                    "
                  >
                    {dorama.title}
                  </h3>

                  <div
                    className="
                      mt-4
                      flex
                      items-center
                      justify-between
                      text-sm
                    "
                  >
                    <span className="text-zinc-400">
                      {dorama.year}
                    </span>

                    <span
                      className="
                        font-semibold
                        text-yellow-300
                      "
                    >
                      ★{" "}
                      {Number(
                        dorama.popularityScore || 0
                      ).toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}