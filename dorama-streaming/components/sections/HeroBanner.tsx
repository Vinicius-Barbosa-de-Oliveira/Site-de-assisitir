"use client";

import { motion } from "framer-motion";

type HeroBannerProps = {
  title: string;
  description: string;
  bannerUrl: string;
  coverUrl?: string;

  year?: number;
  country?: string;
  status?: string;
};

export function HeroBanner({
  title,
  description,
  bannerUrl,
  coverUrl,

  year,
  country,
  status,
}: HeroBannerProps) {
  return (
    <section
      className="
        relative
        h-[85vh]
        min-h-[700px]
        w-full
        overflow-hidden
      "
    >
      {/* Background */}
      <div
        className="
          absolute
          inset-0
        "
      >
        <img
          src={bannerUrl}
          alt={title}
          className="
            h-full
            w-full
            object-cover
          "
        />

        {/* Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/70
            to-black/30
          "
        />

        {/* Blur */}
        <div
          className="
            absolute
            inset-0
            backdrop-blur-[2px]
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          h-full
          max-w-[1600px]
          items-center
          px-4
          md:px-6
          lg:px-8
        "
      >
        <div
          className="
            grid
            w-full
            gap-10
            lg:grid-cols-[1fr_320px]
          "
        >
          {/* Left */}
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              flex
              max-w-3xl
              flex-col
              justify-center
            "
          >
            {/* Metadata */}
            <div
              className="
                mb-4
                flex
                flex-wrap
                items-center
                gap-3
              "
            >
              {year && (
                <span
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-1
                    text-sm
                    text-zinc-200
                    backdrop-blur-md
                  "
                >
                  {year}
                </span>
              )}

              {country && (
                <span
                  className="
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-3
                    py-1
                    text-sm
                    text-zinc-200
                    backdrop-blur-md
                  "
                >
                  {country}
                </span>
              )}

              {status && (
                <span
                  className="
                    rounded-full
                    bg-purple-600/20
                    px-3
                    py-1
                    text-sm
                    text-purple-200
                    backdrop-blur-md
                  "
                >
                  {status}
                </span>
              )}
            </div>

            {/* Title */}
            <h1
              className="
                text-5xl
                font-black
                leading-tight
                text-white
                md:text-7xl
              "
            >
              {title}
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-8
                text-zinc-300
                md:text-lg
              "
            >
              {description}
            </p>

            {/* Buttons */}
            <div
              className="
                mt-10
                flex
                flex-wrap
                gap-4
              "
            >
              <button
                className="
                  rounded-2xl
                  bg-white
                  px-8
                  py-4
                  font-semibold
                  text-black
                  transition-all
                  hover:scale-105
                "
              >
                Assistir Agora
              </button>

              <button
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-8
                  py-4
                  font-semibold
                  text-white
                  backdrop-blur-md
                  transition-all
                  hover:bg-white/10
                "
              >
                Favoritar
              </button>
            </div>
          </motion.div>

          {/* Poster */}
          {coverUrl && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                hidden
                items-center
                justify-center
                lg:flex
              "
            >
              <div
                className="
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/5
                  shadow-2xl
                  backdrop-blur-md
                "
              >
                <img
                  src={coverUrl}
                  alt={title}
                  className="
                    h-[500px]
                    w-[320px]
                    object-cover
                  "
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}