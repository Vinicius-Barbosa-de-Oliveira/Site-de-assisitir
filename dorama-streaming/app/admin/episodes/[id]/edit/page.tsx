import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

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
    <section className="p-10 text-white">

      <div className="max-w-4xl mx-auto">

        <div className="mb-10">

          <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
            Editando Episódio
          </span>

          <h1 className="text-5xl font-black mt-6">
            {episode.title}
          </h1>

        </div>

        <form className="space-y-6">

          <div>

            <label className="block mb-3 text-sm text-zinc-400">
              Título
            </label>

            <input
              defaultValue={episode.title}
              className="w-full bg-[#18181F] border border-white/5 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <div>

            <label className="block mb-3 text-sm text-zinc-400">
              Episódio
            </label>

            <input
              defaultValue={episode.number}
              type="number"
              className="w-full bg-[#18181F] border border-white/5 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <div>

            <label className="block mb-3 text-sm text-zinc-400">
              Thumbnail
            </label>

            <input
              defaultValue={episode.thumbnail}
              className="w-full bg-[#18181F] border border-white/5 rounded-2xl px-5 py-4 outline-none"
            />

          </div>

          <button
            type="submit"
            className="bg-purple-500 hover:bg-purple-600 transition px-8 py-4 rounded-2xl font-bold"
          >
            Salvar Alterações
          </button>

        </form>

      </div>

    </section>
  );
}