"use client";

import { useState } from "react";

type Episode = {
  id: string;
  title: string;
  number: number;
};

type SeasonProps = {
  seasonNumber: number;
  title: string;
  episodes: Episode[];
};

export default function SeasonAccordion({
  seasonNumber,
  title,
  episodes,
}: SeasonProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center"
      >
        {/* NUMBER */}
        <div
          className="
            flex h-20 w-20 items-center
            justify-center bg-red-600
            text-3xl font-bold text-white
          "
        >
          {seasonNumber}
        </div>

        {/* TITLE */}
        <div
          className="
            flex flex-1 items-center
            justify-between px-6
          "
        >
          <div>
            <h3 className="text-lg font-semibold text-white">
              {title}
            </h3>

            <p className="text-sm text-zinc-400">
              {episodes.length} episódios
            </p>
          </div>

          <span
            className={`
              text-2xl text-white transition
              ${open ? "rotate-180" : ""}
            `}
          >
            ▼
          </span>
        </div>
      </button>

      {/* EPISODES */}
      {open && (
        <div className="border-t border-white/10">
          {episodes.map((ep) => (
            <div
              key={ep.id}
              className="
                flex items-center
                justify-between
                border-b border-white/5
                px-6 py-4
                hover:bg-white/5
              "
            >
              <div>
                <p className="text-sm text-zinc-400">
                  Episódio {ep.number}
                </p>

                <h4 className="text-white">
                  {ep.title}
                </h4>
              </div>

              <button
                className="
                  rounded-xl bg-red-600
                  px-4 py-2 text-sm
                  font-semibold text-white
                  hover:bg-red-500
                "
              >
                Assistir
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}