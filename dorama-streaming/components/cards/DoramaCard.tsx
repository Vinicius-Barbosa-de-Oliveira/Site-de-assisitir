"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type DoramaCardProps = {
  slug: string;

  title: string;
  image: string;

  rating?: number;
  status?: string;
  year?: number;
};

export function DoramaCard({
  slug,
  title,
  image,

  rating,
  status,
  year,
}: DoramaCardProps) {
  return (
    <Link href={`/dorama/${slug}`}>
      <motion.div
        whileHover={{
          scale: 1.04,
        }}
        transition={{
          duration: 0.2,
        }}
        className="
          group
          relative
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-900/40
          shadow-2xl
          backdrop-blur-md
        "
      >
        {/* Image */}
        <div
          className="
            relative
            aspect-2/3
            overflow-hidden
          "
        >
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, 20vw"
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
            "
          />

          {/* Gradient */}
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

          {/* Hover Overlay */}
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              bg-black/40
              opacity-0
              transition-all
              duration-300
              group-hover:opacity-100
            "
          >
            <button
              className="
                rounded-full
                bg-white
                px-6
                py-3
                font-semibold
                text-black
                shadow-xl
                transition-transform
                hover:scale-105
              "
            >
              Assistir
            </button>
          </div>

          {/* Rating */}
          {rating && (
            <div
              className="
                absolute
                right-3
                top-3
                rounded-full
                bg-black/60
                px-3
                py-1
                text-sm
                font-medium
                text-yellow-300
                backdrop-blur-md
              "
            >
              ⭐ {rating.toFixed(1)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="
              line-clamp-1
              text-lg
              font-bold
              text-white
            "
          >
            {title}
          </h3>

          <div
            className="
              mt-2
              flex
              items-center
              gap-2
              text-sm
              text-zinc-400
            "
          >
            {year && <span>{year}</span>}

            {status && (
              <>
                <span>•</span>

                <span>{status}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}