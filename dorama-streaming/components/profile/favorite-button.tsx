"use client";

import { useTransition } from "react";

import { Heart } from "lucide-react";

import { toggleFavorite } from "@/app/actions/favorite";

type Props = {
  doramaId: string;
  isFavorited: boolean;
};

export default function FavoriteButton({
  doramaId,
  isFavorited,
}: Props) {

  const [isPending, startTransition] =
    useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          await toggleFavorite(doramaId);
        })
      }
      className={`px-8 py-4 rounded-2xl transition font-semibold flex items-center gap-2 ${
        isFavorited
          ? "bg-pink-500 hover:bg-pink-600"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >
      <Heart size={20} />

      <span>
        {isPending
          ? "Carregando..."
          : isFavorited
          ? "Favoritado"
          : "Minha Lista"}
      </span>
    </button>
  );
}