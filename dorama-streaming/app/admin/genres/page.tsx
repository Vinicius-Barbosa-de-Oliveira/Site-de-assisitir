import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  createGenre,
  deleteGenre,
} from "./actions";
import { db } from "@/lib/db";

export default async function GenresPage() {

  const genres =
    await prisma.genre.findMany({

      orderBy: {
        name: "asc",
      },

      include: {
        dramas: true,
      },

    });

  return (

    <main className="min-h-screen bg-[#0F0F14] text-white">

      <Navbar />

      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="flex items-center justify-between mb-12">

          <div>

            <h1 className="text-5xl font-black">
              Gêneros
            </h1>

            <p className="text-zinc-400 mt-3">
              Gerencie os gêneros do site
            </p>

          </div>

        </div>

        {/* CREATE */}

        <form
          action={createGenre}
          className="bg-[#18181F] border border-white/5 rounded-3xl p-8 mb-10"
        >

          <h2 className="text-2xl font-bold mb-6">
            Novo Gênero
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              name="name"
              placeholder="Nome do gênero"
              required
              className="flex-1 h-14 rounded-2xl bg-black/30 border border-white/5 px-5 outline-none focus:border-purple-500/40"
            />

            <button
              type="submit"
              className="px-8 rounded-2xl bg-purple-500 hover:bg-purple-600 transition font-semibold"
            >
              Criar
            </button>

          </div>

        </form>

        {/* LIST */}

        <div className="space-y-4">

          {genres.map((genre) => (

            <div
              key={genre.id}
              className="bg-[#18181F] border border-white/5 rounded-3xl p-6 flex items-center justify-between"
            >

              <div>

                <h3 className="text-2xl font-bold">
                  {genre.name}
                </h3>

                <p className="text-zinc-400 mt-2">
                  {genre.dramas.length} dramas
                </p>

              </div>

              <form
                action={async () => {
                  "use server";
                  await deleteGenre(genre.id);
                }}
              >

                <button
                  type="submit"
                  className="px-6 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition"
                >
                  Excluir
                </button>

              </form>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>

  );

}