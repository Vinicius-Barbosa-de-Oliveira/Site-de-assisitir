import { createDrama } from "../actions";

export default function NewDramaPage() {
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
                Novo Dorama
              </h1>

              <p className="text-zinc-400 text-lg mt-5 max-w-2xl leading-relaxed">
                Crie um novo dorama para adicionar ao catálogo da plataforma.
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            action={createDrama}
            className="mt-10 space-y-8"
          >

            {/* GRID */}

            <div className="grid xl:grid-cols-[1fr_380px] gap-8">

              {/* LEFT */}

              <div className="space-y-8">

                {/* BASIC */}

                <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Informações Básicas
                  </h2>

                  <div className="space-y-6">

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Título
                      </label>

                      <input
                        name="title"
                        required
                        placeholder="Ex: The Prisoner of Beauty"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Slug
                      </label>

                      <input
                        name="slug"
                        required
                        placeholder="the-prisoner-of-beauty"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Descrição
                      </label>

                      <textarea
                        name="description"
                        rows={6}
                        placeholder="Digite a sinopse do dorama..."
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition resize-none"
                      />
                    </div>

                  </div>

                </div>

                {/* IMAGES */}

                <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

                  <h2 className="text-2xl font-bold mb-8">
                    Imagens
                  </h2>

                  <div className="space-y-6">

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Banner
                      </label>

                      <input
                        name="bannerImage"
                        required
                        placeholder="URL do banner"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Capa
                      </label>

                      <input
                        name="coverImage"
                        required
                        placeholder="URL da capa"
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

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        País
                      </label>

                      <input
                        name="country"
                        required
                        placeholder="Coreia do Sul"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Ano
                      </label>

                      <input
                        type="number"
                        name="year"
                        required
                        placeholder="2025"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Nota
                      </label>

                      <input
                        type="number"
                        step="0.1"
                        name="rating"
                        required
                        placeholder="9.4"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-zinc-400 mb-3">
                        Status
                      </label>

                      <select
                        name="status"
                        className="w-full bg-black/20 border border-white/5 focus:border-purple-500 outline-none rounded-2xl px-5 py-4 transition"
                      >
                        <option value="Em lançamento">
                          Em lançamento
                        </option>

                        <option value="Completo">
                          Completo
                        </option>
                      </select>
                    </div>

                  </div>

                </div>

                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full bg-purple-500 hover:bg-purple-600 transition rounded-3xl py-5 text-lg font-bold shadow-[0_0_40px_rgba(168,85,247,0.35)]"
                >
                  Criar Dorama
                </button>

              </div>

            </div>

          </form>

        </section>

    </main>
  );
}