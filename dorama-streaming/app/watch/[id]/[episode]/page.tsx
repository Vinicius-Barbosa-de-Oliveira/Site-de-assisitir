import Navbar from "@/components/Navbar";

type Props = {
  params: {
    id: string;
    episode: string;
  };
};

export default function WatchPage({ params }: Props) {
  return (
    <main className="bg-[#0F0F14] min-h-screen text-white">

      <Navbar />

      <section className="max-w-1800px mx-auto px-4 py-6">

        <div className="grid lg:grid-cols-[1fr_380px] gap-6">

          {/* PLAYER */}

          <div>

            <div className="bg-black rounded-3xl overflow-hidden aspect-video relative">

              <video
                controls
                className="w-full h-full"
              >
                <source
                  src="https://www.w3schools.com/html/mov_bbb.mp4"
                  type="video/mp4"
                />
              </video>

            </div>

            {/* INFO */}

            <div className="mt-6">

              <span className="text-purple-400 text-sm">
                EPISÓDIO {params.episode}
              </span>

              <h1 className="text-4xl font-bold mt-2">
                The Prisoner of Beauty
              </h1>

              <p className="text-zinc-400 mt-4 max-w-4xl">
                Uma guerra silenciosa ameaça destruir alianças antigas enquanto
                sentimentos proibidos começam a surgir.
              </p>

            </div>

            {/* CONTROLES */}

            <div className="flex flex-wrap gap-4 mt-8">

              <button className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold">
                Próximo Episódio
              </button>

              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl">
                Episódio Anterior
              </button>

              <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl">
                ❤️ Favoritar
              </button>

            </div>

            {/* COMENTÁRIOS */}

            <section className="mt-16">

              <h2 className="text-3xl font-bold mb-8">
                Comentários
              </h2>

              <div className="space-y-6">

                <div className="bg-[#18181F] p-6 rounded-2xl">

                  <div className="flex items-center gap-4">

                    <div className="w-12 h-12 bg-purple-500 rounded-full" />

                    <div>

                      <h3 className="font-semibold">
                        Usuário
                      </h3>

                      <p className="text-zinc-400 text-sm">
                        há 2 horas
                      </p>

                    </div>

                  </div>

                  <p className="text-zinc-300 mt-4">
                    Esse episódio foi absurdo 🔥
                  </p>

                </div>

              </div>

            </section>

          </div>

          {/* SIDEBAR */}

          <aside className="bg-[#18181F] rounded-3xl p-6 h-fit sticky top-24">

            <div className="flex items-center justify-between mb-6">

              <h2 className="text-2xl font-bold">
                Episódios
              </h2>

              <span className="text-zinc-400">
                40 EP
              </span>

            </div>

            <div className="space-y-4 max-h-800px overflow-y-auto pr-2">

              {[1,2,3,4,5,6,7,8,9,10].map((ep) => (

                <a
                  href={`/watch/${params.id}/${ep}`}
                  key={ep}
                  className={`block p-4 rounded-2xl cursor-pointer transition ${
                    ep.toString() === params.episode
                      ? "bg-purple-500"
                      : "bg-black/20 hover:bg-black/40"
                  }`}
                >

                  <div className="flex gap-4">

                    <div className="w-28 h-16 bg-zinc-700 rounded-xl" />

                    <div>

                      <h3 className="font-semibold">
                        Episódio {ep}
                      </h3>

                      <p className="text-sm text-zinc-300 mt-2">
                        Legendado • Full HD
                      </p>

                    </div>

                  </div>

                </a>

              ))}

            </div>

          </aside>

        </div>

      </section>

    </main>
  );
}