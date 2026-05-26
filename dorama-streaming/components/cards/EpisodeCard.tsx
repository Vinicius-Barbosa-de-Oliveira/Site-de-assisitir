"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type EpisodeCardProps = {
  id: string,
  title: string;
  thumbnail: string;
  doramaTitle: string;
  episodeNumber: number;
  duration?: number;
};

export function EpisodeCard({
  id,
  title,
  thumbnail,
  doramaTitle,
  episodeNumber,
  duration,
}: EpisodeCardProps) {
  return (
    <Link href={`/watch/${id}`}>
      <motion.div
        whileHover={{
          scale: 1.02,
        }}
        className="
          group
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-zinc-900/40
          backdrop-blur-md
        "
      >
        {/* Thumbnail */}
        <div
          className="
            relative
            aspect-video
            overflow-hidden
          "
        >
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
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
              bg-linear-to-t
              from-black
              to-transparent
            "
          />

          <div
            className="
              absolute
              bottom-3
              left-3
              rounded-full
              bg-black/70
              px-3
              py-1
              text-xs
              text-white
              backdrop-blur-md
            "
          >
            EP {episodeNumber}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p
            className="
              text-sm
              text-purple-300
            "
          >
            {doramaTitle}
          </p>

          <h3
            className="
              mt-1
              line-clamp-1
              font-semibold
              text-white
            "
          >
            {title}
          </h3>

          {duration && (
            <p
              className="
                mt-2
                text-sm
                text-zinc-400
              "
            >
              {duration} min
            </p>
          )}
        </div>
      </motion.div> 
    </Link>                                
  );
}