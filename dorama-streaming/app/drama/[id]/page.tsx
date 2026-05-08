import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EpisodeCard from "@/components/EpisodeCard";

import Recommended from "@/sections/Recommended";

import { dramas } from "@/data/dramas";
import Link from "next/link";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DramaPage({ params }: Props) {
  const resolvedParams = await params;
  console.log("params:", resolvedParams);
  console.log("params.id:", resolvedParams?.id);
  const id = resolvedParams?.id?.trim().toLowerCase() ?? "";

  const drama = dramas.find((item) =>
    item.id.trim().toLowerCase() === id
  );

  if (!drama) {
    return (
      <main className="bg-[#0F0F14] min-h-screen text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Dorama não encontrado.
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-[#0F0F14] min-h-screen text-white">

        <Navbar />

        <section className="relative h-175 overflow-hidden">

            <img
            src={drama.image}
            alt={drama.title}
            className="absolute inset-0 w-full h-full object-cover opacity-30"
            />

            <div className="absolute inset-0 bg-linear-to-t from-[#0F0F14] via-[#0F0F14]/70 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-end pb-20">

            <div className="grid md:grid-cols-[300px_1fr] gap-10 items-end">

                <img
                src={drama.image}
                alt={drama.title}
                className="w-full h-105 object-cover rounded-3xl shadow-2xl"
                />

                <div>

                <span className="bg-purple-500 px-4 py-2 rounded-full text-sm">
                    Em andamento
                </span>

                <h1 className="text-6xl font-bold mt-6">
                    {drama.title}
                </h1>

                <div className="flex flex-wrap gap-3 mt-6">

                    <span className="bg-white/10 px-4 py-2 rounded-xl">
                    Romance
                    </span>

                    <span className="bg-white/10 px-4 py-2 rounded-xl">
                    Histórico
                    </span>

                    <span className="bg-white/10 px-4 py-2 rounded-xl">
                    Drama
                    </span>

                </div>

                <p className="text-zinc-300 mt-6 max-w-3xl leading-relaxed">
                    Uma história épica de amor, guerra e política em um reino dividido.
                </p>

                <div className="flex flex-wrap gap-4 mt-8">

                    <Link
                    href={`/watch/${drama.id}/1`}
                    className="bg-purple-500 hover:bg-purple-600 px-8 py-4 rounded-2xl font-semibold"
                    >
                    ▶ Assistir Agora
                    </Link>

                    <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl">
                    ❤️ Favoritar
                    </button>

                    <button className="bg-white/10 hover:bg-white/20 px-8 py-4 rounded-2xl">
                    ➕ Minha Lista
                    </button>

                </div>

                </div>

            </div>

            </div>

        </section>

        <section className="max-w-7xl mx-auto px-6 py-16">

            <div className="grid md:grid-cols-4 gap-6">

            <div className="bg-[#18181F] p-6 rounded-2xl">
                <h3 className="text-zinc-400 text-sm">
                País
                </h3>

                <p className="font-semibold mt-2">
                China
                </p>
            </div>

            <div className="bg-[#18181F] p-6 rounded-2xl">
                <h3 className="text-zinc-400 text-sm">
                Episódios
                </h3>

                <p className="font-semibold mt-2">
                40
                </p>
            </div>

            <div className="bg-[#18181F] p-6 rounded-2xl">
                <h3 className="text-zinc-400 text-sm">
                Duração
                </h3>

                <p className="font-semibold mt-2">
                45 min
                </p>
            </div>

            <div className="bg-[#18181F] p-6 rounded-2xl">
                <h3 className="text-zinc-400 text-sm">
                Avaliação
                </h3>

                <p className="font-semibold mt-2">
                ⭐ 9.4
                </p>
            </div>

            </div>

        </section>

        <section className="max-w-7xl mx-auto px-6 py-10">

            <div className="flex items-center justify-between mb-8">

                <h2 className="text-3xl font-bold">
                    Episódios
                </h2>

                <button className="text-purple-400">
                    Ordenar
                </button>

            </div>

            <div className="space-y-4">

                {[1, 2, 3, 4, 5, 6].map((episode) => (

                    <div key={episode}>
                        <Link href={`/watch/${drama.id}/${episode}`}>
                            <EpisodeCard number={episode} />
                        </Link>
                    </div>

                ))}

            </div>

        </section>

        <Recommended />

        <Footer />

    </main>
  );
}