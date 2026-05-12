import Image from "next/image";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import { updateEpisode } from "../../actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditEpisodePage({
  params,
}: Props) {

  const { id } = await params;

  const episode =
    await prisma.episode.findUnique({

      where: {
        id,
      },

      include: {
        drama: true,
      },

    });

  if (!episode) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">

      {/* HERO */}

      <section className="relative h-90 overflow-hidden">

        <Image
          src={episode.thumbnail}
          alt={episode.title}
          fill
          priority
          className="object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-[#0F0F14]/80 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-12">

          <div>

            <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
              Editar Episódio
            </span>

            <h1 className="text-4xl md:text-6xl font-black mt-6">
              {episode.title}
            </h1>

            <div className="flex flex-wrap gap-3 mt-5">

              <div className="bg-white/10 px-4 py-2 rounded-2xl">
                EP {episode.number}
              </div>

              <div className="bg-white/10 px-4 py-2 rounded-2xl">
                {episode.duration} min
              </div>

              <div className="bg-white/10 px-4 py-2 rounded-2xl">
                {episode.drama.title}
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FORM */}

      <section className="max-w-5xl mx-auto px-6 py-14">

        <form
          action={updateEpisode.bind(
            null,
            episode.id
          )}
          className="bg-[#18181F] border border-white/5 rounded-3xl p-8"
        >

          <div className="mb-10">

            <h2 className="text-3xl font-bold">
              Informações do Episódio
            </h2>

            <p className="text-zinc-400 mt-2">
              Atualize os dados do episódio.
            </p>

          </div>

          <div className="space-y-6">

            <div>

              <label className="block text-sm text-zinc-400 mb-3">
                Título
              </label>

              <input
                name="title"
                defaultValue={episode.title}
                className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
              />

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Número
                </label>

                <input
                  type="number"
                  name="number"
                  defaultValue={episode.number}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Duração
                </label>

                <input
                  type="number"
                  name="duration"
                  defaultValue={episode.duration}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

            </div>

            <div>

              <label className="block text-sm text-zinc-400 mb-3">
                Thumbnail URL
              </label>

              <input
                name="thumbnail"
                defaultValue={episode.thumbnail}
                className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
              />

            </div>

            <div>

              <label className="block text-sm text-zinc-400 mb-3">
                Vídeo URL
              </label>

              <input
                name="videoUrl"
                defaultValue={episode.videoUrl}
                className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
              />

            </div>

            <div>

              <label className="block text-sm text-zinc-400 mb-3">
                Descrição
              </label>

              <textarea
                name="description"
                rows={6}
                defaultValue={episode.description || ""}
                className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition resize-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-bold text-lg"
            >
              Salvar Alterações
            </button>

          </div>

        </form>

      </section>

    </main>
  );
}