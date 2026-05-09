import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth";

export default async function ProfilePage() {

  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/login");
  }

  return (

    <main className="min-h-screen bg-[#0F0F14] text-white px-6 py-10">

      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-6 mb-12">

          <div className="w-28 h-28 rounded-full bg-purple-500 flex items-center justify-center text-5xl font-black">

            {session.user?.name?.[0]}

          </div>

          <div>

            <h1 className="text-5xl font-black">

              {session.user?.name}

            </h1>

            <p className="text-white/60 mt-2">

              {session.user?.email}

            </p>

          </div>

        </div>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

          <div className="bg-[#18181F] rounded-3xl p-6 border border-white/5">

            <p className="text-white/50 text-sm mb-2">

              Doramas Favoritos

            </p>

            <h2 className="text-4xl font-black">

              0

            </h2>

          </div>

          <div className="bg-[#18181F] rounded-3xl p-6 border border-white/5">

            <p className="text-white/50 text-sm mb-2">

              Episódios Assistidos

            </p>

            <h2 className="text-4xl font-black">

              0

            </h2>

          </div>

          <div className="bg-[#18181F] rounded-3xl p-6 border border-white/5">

            <p className="text-white/50 text-sm mb-2">

              Tempo Assistido

            </p>

            <h2 className="text-4xl font-black">

              0h

            </h2>

          </div>

        </section>

        <section className="mb-12">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-black">

              Continue Assistindo

            </h2>

          </div>

          <div className="bg-[#18181F] rounded-3xl p-10 border border-white/5 text-white/50">

            Nenhum episódio em andamento.

          </div>

        </section>

        <section>

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-black">

              Favoritos

            </h2>

          </div>

          <div className="bg-[#18181F] rounded-3xl p-10 border border-white/5 text-white/50">

            Nenhum favorito ainda.

          </div>

        </section>

      </div>

    </main>

  );

}