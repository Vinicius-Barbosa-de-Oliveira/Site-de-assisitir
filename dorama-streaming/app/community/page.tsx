import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { prisma } from "@/lib/prisma";

import CommunityChat from "@/components/CommunityChat";

import {
  CommunityMessage,
  User,
} from "@prisma/client";

export default async function CommunityPage() {

  const messages: (CommunityMessage & {
    user: User;
  })[] =
    await prisma.communityMessage.findMany({

      include: {
        user: true,
      },

      orderBy: {
        createdAt: "asc",
      },

      take: 100,

    });

  return (

    <main className="bg-[#0B0B10] min-h-screen text-white flex flex-col">

      <Navbar />

      <section className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">

        <div className="mb-8">

          <h1 className="text-5xl font-black">
            Comunidade
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Converse em tempo real com outros fãs de doramas.
          </p>

        </div>

        <div className="
          grid
          lg:grid-cols-[320px_1fr]
          gap-6
          h-[78vh]
        ">

          {/* SIDEBAR */}

          <aside className="
            bg-[#14141B]
            border
            border-white/5
            rounded-3xl
            p-6
            hidden
            lg:flex
            flex-col
          ">

            <h2 className="text-2xl font-bold mb-6">
              Salas
            </h2>

            <div className="space-y-3">

              <button
                className="
                  w-full
                  bg-purple-500
                  text-white
                  rounded-2xl
                  px-5
                  py-4
                  text-left
                  font-semibold
                "
              >
                🌎 Chat Global
              </button>

            </div>

            <div className="mt-auto pt-8">

              <div className="
                bg-[#0F0F14]
                rounded-2xl
                p-5
                border
                border-white/5
              ">

                <h3 className="font-bold">
                  Comunidade Online
                </h3>

                <p className="text-zinc-400 mt-2 text-sm leading-relaxed">
                  Converse sobre episódios, teorias e lançamentos.
                </p>

              </div>

            </div>

          </aside>

          {/* CHAT */}

          <div className="
            bg-[#14141B]
            border
            border-white/5
            rounded-3xl
            overflow-hidden
            flex
            flex-col
          ">

            <CommunityChat
              initialMessages={messages}
            />

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}