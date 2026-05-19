import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { getGenres } from "@/lib/data";

import { Genre } from "@prisma/client";

import { updateDrama } from "../../actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditDramaPage({
  params,
}: Props) {

  const { id } = await params;

  const genres: Genre[] =
    await getGenres();

  const drama =
    await prisma.drama.findUnique({

      where: {
        id,
      },

      include: {

        genres: true,

        episodes: {
          orderBy: {
            number: "asc",
          },
        },

      },

    });

  if (!drama) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0F0F14] text-white">

      {/* HERO */}

      <section className="relative h-105 overflow-hidden">

        <Image
          src={drama.bannerImage}
          alt={drama.title}
          fill
          priority
          className="object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-[#0F0F14]/80 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-14">

          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-end">

            <Image
              src={drama.coverImage}
              alt={drama.title}
              width={260}
              height={380}
              className="rounded-3xl object-cover shadow-2xl border border-white/10"
            />

            <div>

              <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                Editar Dorama
              </span>

              <h1 className="text-4xl md:text-6xl font-black mt-6">
                {drama.title}
              </h1>

              <div className="flex flex-wrap gap-3 mt-5">

                <div className="bg-white/10 px-4 py-2 rounded-2xl">
                  ⭐ {drama.rating}
                </div>

                <div className="bg-white/10 px-4 py-2 rounded-2xl">
                  {drama.year}
                </div>

                <div className="bg-white/10 px-4 py-2 rounded-2xl">
                  {drama.country}
                </div>

                <div className="bg-white/10 px-4 py-2 rounded-2xl">
                  {drama.episodes.length} episódios
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid xl:grid-cols-[1fr_400px] gap-10">

          {/* FORM */}

          <form
            action={updateDrama.bind(
              null,
              drama.id
            )}
            className="space-y-6"
          >

            <div className="mb-10">

              <h2 className="text-3xl font-bold">
                Informações
              </h2>

              <p className="text-zinc-400 mt-2">
                Atualize os dados do dorama.
              </p>

            </div>

            <div className="space-y-6">

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Título
                </label>

                <input
                  name="title"
                  defaultValue={drama.title}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Slug
                </label>

                <input
                  name="slug"
                  defaultValue={drama.slug}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Banner URL
                </label>

                <input
                  name="bannerImage"
                  defaultValue={drama.bannerImage}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Cover URL
                </label>

                <input
                  name="coverImage"
                  defaultValue={drama.coverImage}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                />

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    País
                  </label>

                  <input
                    name="country"
                    defaultValue={drama.country}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    Ano
                  </label>

                  <input
                    type="number"
                    name="year"
                    defaultValue={drama.year}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    Nota
                  </label>

                  <input
                    type="number"
                    step="0.1"
                    name="rating"
                    defaultValue={drama.rating}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    Status
                  </label>

                  <input
                    name="status"
                    defaultValue={drama.status}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    Dia
                  </label>

                  <input
                    name="scheduleDay"
                    defaultValue={drama.scheduleDay || ""}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

                <div>

                  <label className="block text-sm text-zinc-400 mb-3">
                    Horário
                  </label>

                  <input
                    name="scheduleTime"
                    defaultValue={drama.scheduleTime || ""}
                    className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition"
                  />

                </div>

              </div>

              <div>

                <label className="block text-sm text-zinc-400 mb-3">
                  Descrição
                </label>

                <textarea
                  name="description"
                  rows={7}
                  defaultValue={drama.description}
                  className="w-full bg-[#0F0F14] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-purple-500 transition resize-none"
                />

              </div>

              {/* GÊNEROS */}

              <div className="space-y-4">

                <label className="text-sm font-semibold text-white/70">
                  Gêneros
                </label>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

                  {genres.map((genre) => {

                  const isSelected =
                    drama.genres.some(
                      (g) => g.id === genre.id
                    );

                  return (

                    <label
                      key={genre.id}
                      className="cursor-pointer"
                    >

                      <input
                        type="checkbox"
                        name="genres"
                        value={genre.id}
                        defaultChecked={isSelected}
                        className="peer hidden"
                      />

                      <div
                        className="
                          rounded-2xl
                          border
                          border-white/5
                          bg-[#18181F]
                          p-4
                          text-center
                          font-medium
                          transition-all
                          duration-200

                          hover:border-purple-500
                          hover:bg-purple-500/10

                          peer-checked:border-purple-500
                          peer-checked:bg-purple-500/15
                          peer-checked:text-purple-300
                          peer-checked:shadow-lg
                          peer-checked:shadow-purple-500/10
                        "
                      >

                        {genre.name}

                      </div>

                    </label>

                  );

                })}

              </div>
            </div>
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 transition py-4 rounded-2xl font-bold text-lg"
              >
                Salvar Alterações
              </button>

            </div>

          </form>

          {/* SIDEBAR */}

          <aside className="space-y-6">

            <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

              <h3 className="text-2xl font-bold mb-6">
                Estatísticas
              </h3>

              <div className="space-y-4">

                <div className="bg-[#0F0F14] rounded-2xl p-5 flex items-center justify-between">

                  <span className="text-zinc-400">
                    Episódios
                  </span>

                  <span className="font-bold text-xl">
                    {drama.episodes.length}
                  </span>

                </div>

                <div className="bg-[#0F0F14] rounded-2xl p-5 flex items-center justify-between">

                  <span className="text-zinc-400">
                    Status
                  </span>

                  <span className="font-bold">
                    {drama.status}
                  </span>

                </div>

                <div className="bg-[#0F0F14] rounded-2xl p-5 flex items-center justify-between">

                  <span className="text-zinc-400">
                    Nota
                  </span>

                  <span className="font-bold">
                    ⭐ {drama.rating}
                  </span>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}