import { db } from "@/lib/db";

import { createEpisode } from "../actions";

export default async function NewEpisodePage() {

  const dramas = await prisma.drama.findMany({
    orderBy: {
      title: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-[#0B0B11] text-white">


        <section className="p-6 md:p-10">

          {/* HERO */}

          <div className="relative overflow-hidden rounded-4xl border border-white/5 bg-[#18181F]">

            <div className="absolute inset-0 bg-linear-to-r from-purple-500/20 via-transparent to-transparent" />

            <div className="relative z-10 p-8 md:p-12">

              <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-semibold">
                Painel Administrativo
              </span>

              <h1 className="text-5xl md:text-6xl font-black mt-6">
                Novo Episódio
              </h1>

              <p className="text-zinc-400 text-lg mt-5 max-w-2xl leading-relaxed">
                Adicione um novo episódio ao catálogo da plataforma.
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            action={createEpisode}
            className="mt-10 space-y-8"
          >

            <div className="grid xl:grid-cols-[1fr_380px] gap-8">

              {/* LEFT */}

              <div className="space-y-8">

                {/* INFORMATIONS */}

                <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Informações do Episódio
                  </h2>

                  <div className="space-y-6">

                    {/* DRAMA */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Dorama
                      </label>

                      <select
                        name="dramaId"
                        required
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      >
                        <option value="">
                          Selecione um dorama
                        </option>

                        {dramas.map((drama) => (

                          <option
                            key={drama.id}
                            value={drama.id}
                          >
                            {drama.title}
                          </option>

                        ))}

                      </select>
                    </div>

                    {/* TITLE */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Título do Episódio
                      </label>

                      <input
                        name="title"
                        required
                        placeholder="Ex: O Início"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    {/* DESCRIPTION */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Descrição
                      </label>

                      <textarea
                        name="description"
                        rows={6}
                        placeholder="Digite a descrição do episódio..."
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition resize-none"
                      />
                    </div>

                  </div>

                </div>

                {/* MEDIA */}

                <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Mídia
                  </h2>

                  <div className="space-y-6">

                    {/* THUMB */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Thumbnail
                      </label>

                      <input
                        name="thumbnail"
                        required
                        placeholder="URL da thumbnail"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    {/* VIDEO */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        URL do Vídeo
                      </label>

                      <input
                        name="videoUrl"
                        required
                        placeholder="https://..."
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                  </div>

                </div>

              </div>

              {/* RIGHT */}

              <div className="space-y-8">

                <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Detalhes
                  </h2>

                  <div className="space-y-6">

                    {/* NUMBER */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Número do Episódio
                      </label>

                      <input
                        type="number"
                        name="number"
                        required
                        placeholder="1"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    {/* DURATION */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Duração (minutos)
                      </label>

                      <input
                        type="number"
                        name="duration"
                        required
                        placeholder="58"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    {/* DATE */}

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Data de Lançamento
                      </label>

                      <input
                        type="date"
                        name="releaseDate"
                        required
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-3xl py-5 text-lg font-bold shadow-[0_0_40px_rgba(168,85,247,0.35)]"
                >
                  Criar Episódio
                </button>

              </div>

            </div>

          </form>

        </section>
        
    </main>
  );
}