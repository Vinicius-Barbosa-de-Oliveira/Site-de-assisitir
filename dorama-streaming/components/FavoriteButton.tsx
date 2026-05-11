"use client";

import { useOptimistic, useTransition } from "react";

import { Heart } from "lucide-react";

import { toggleFavorite } from "@/app/actions/favorite";

interface Props {
  dramaId: string;
  isFavorite: boolean;
}

export default function FavoriteButton({
  dramaId,
  isFavorite,
}: Props) {

  const [loading, startTransition] =
    useTransition();

  const [optimisticFavorite, setOptimisticFavorite] =
    useOptimistic(isFavorite);

  async function handleFavorite() {

    setOptimisticFavorite(
      !optimisticFavorite
    );

    await toggleFavorite(dramaId);

  }

  return (
    <button
      onClick={() =>
        startTransition(handleFavorite)
      }
      className={`px-8 py-4 rounded-2xl transition font-semibold flex items-center gap-3 ${
        optimisticFavorite
          ? "bg-purple-500 text-white"
          : "bg-white/10 hover:bg-white/20"
      }`}
    >

      <Heart
        size={20}
        fill={
          optimisticFavorite
            ? "white"
            : "transparent"
        }
      />

      {loading
        ? "Carregando..."
        : optimisticFavorite
        ? "Favoritado"
        : "Favoritar"}

    </button>
  );

}