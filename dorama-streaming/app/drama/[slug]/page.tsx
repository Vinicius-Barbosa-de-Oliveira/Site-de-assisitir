import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { getDramaBySlug } from "@/lib/data";
import TrendingSection from "@/sections/TrendingSection";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DramaPage({
  params,
}: Props) {

  const { slug } = await params;

  const drama =
    await getDramaBySlug(slug);

  if (!drama) {
    return (
      <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">
          Dorama não encontrado
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white">

      <Navbar />

      {/* HERO */}

      <section className="relative h-[70vh] w-full overflow-hidden">

        <Image
          src={drama.bannerImage}
          alt={drama.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#09090B] via-black/60 to-black/40" />
        
        <div className="absolute bottom-0 left-0 w-full px-6 md:px-12 pb-14 flex justify-center">

          <div className="max-w-4xl text-center flex flex-col items-center">

            <span className="bg-purple-500 px-4 py-2 rounded-xl text-sm font-semibold">
              {drama.status}
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-6">
              {drama.title}
            </h1>

            <div className="flex items-center justify-center gap-6 mt-5 text-zinc-300 flex-wrap">

              <span>
                ⭐ {drama.rating}
              </span>

              <span>
                {drama.year}
              </span>

              <span>
                {drama.country}
              </span>

            </div>

            <p className="mt-6 text-zinc-300 leading-8 text-lg max-w-3xl text-center">
              {drama.description}
            </p>

          </div>

        </div>

      </section>

      {/* EPISODES */}

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

          <div>

            <h2 className="text-4xl font-bold">
              Episódios
            </h2>

            <p className="text-zinc-400 mt-2">
              Todos os episódios disponíveis
            </p>

          </div>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

          {drama.episodes.map((episode) => (

            <Link
              key={episode.id}
              href={`/watch/${drama.slug}/${episode.number}`}
              className="group"
            >

              <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/40 rounded-3xl overflow-hidden transition">

                <div className="relative h-55 overflow-hidden">

                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 to-transparent" />

                  <div className="absolute bottom-4 left-4">

                    <span className="bg-purple-500 px-3 py-1 rounded-lg text-sm font-semibold">
                      EP {episode.number}
                    </span>

                  </div>

                </div>

                <div className="p-5">

                  <h3 className="font-bold text-xl line-clamp-1">
                    {episode.title}
                  </h3>

                  <div className="flex items-center justify-between mt-4 text-sm text-zinc-400">

                    <span>
                      {episode.duration} min
                    </span>

                    <span>
                      {new Date(
                        episode.releaseDate
                      ).toLocaleDateString("pt-BR")}
                    </span>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

      </section>

      <Footer />

    </main>
  );
}