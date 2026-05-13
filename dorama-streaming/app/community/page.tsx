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

    <main className="relative min-h-screen bg-[#07070A] text-white overflow-hidden">

      {/* BACKGROUND */}

      <div className="
        absolute
        inset-0
        overflow-hidden
        pointer-events-none
      ">

        <div className="
          absolute
          -top-50
          -left-25
          w-125
          h-125
          bg-purple-500/20
          blur-[180px]
          rounded-full
        " />

        <div className="
          absolute
          -bottom-62.5
          -right-37.5
          w-150
          h-150
          bg-fuchsia-500/10
          blur-[200px]
          rounded-full
        " />

      </div>

      <Navbar />

      <section className="
        relative
        z-10
        max-w-7xl
        mx-auto
        px-6
        py-10
      ">

        {/* HERO */}

        <div className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-[#111118]/80
          backdrop-blur-xl
          p-10
          mb-8
        ">

          <div className="
            absolute
            inset-0
            bg-linear-to-br
            from-purple-500/10
            via-transparent
            to-fuchsia-500/5
          " />

          <div className="relative z-10">

            <div className="
              inline-flex
              items-center
              gap-3
              bg-purple-500/15
              border
              border-purple-500/20
              text-purple-300
              px-5
              py-3
              rounded-full
              text-sm
              font-semibold
              mb-6
            ">

              <div className="
                w-2.5
                h-2.5
                rounded-full
                bg-green-400
                animate-pulse
              " />

              Comunidade Global Online

            </div>

            <h1 className="
              text-6xl
              md:text-7xl
              font-black
              leading-none
              tracking-tight
            ">

              Comunidade
            </h1>

            <p className="
              text-zinc-400
              text-lg
              max-w-3xl
              mt-6
              leading-relaxed
            ">

              Converse em tempo real com outros fãs de doramas,
              compartilhe teorias, descubra novos lançamentos
              e participe da comunidade mais apaixonada por
              dramas asiáticos.

            </p>

            <div className="
              flex
              flex-wrap
              gap-4
              mt-8
            ">

              <div className="
                bg-white/5
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
              ">

                <p className="text-zinc-500 text-sm">
                  Mensagens
                </p>

                <h3 className="text-2xl font-black mt-1">
                  {messages.length}
                </h3>

              </div>

              <div className="
                bg-white/5
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
              ">

                <p className="text-zinc-500 text-sm">
                  Sala Atual
                </p>

                <h3 className="text-2xl font-black mt-1">
                  Global
                </h3>

              </div>

              <div className="
                bg-white/5
                border
                border-white/5
                rounded-2xl
                px-5
                py-4
              ">

                <p className="text-zinc-500 text-sm">
                  Status
                </p>

                <h3 className="
                  text-2xl
                  font-black
                  text-green-400
                  mt-1
                ">
                  Online
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* CONTENT */}

        <div className="
          grid
          lg:grid-cols-[340px_1fr]
          gap-8
          h-[78vh]
        ">

          {/* SIDEBAR */}

          <aside className="
            hidden
            lg:flex
            flex-col
            rounded-[36px]
            border
            border-white/10
            bg-[#111118]/80
            backdrop-blur-xl
            overflow-hidden
          ">

            {/* HEADER */}

            <div className="
              p-7
              border-b
              border-white/5
            ">

              <h2 className="
                text-3xl
                font-black
              ">
                Salas
              </h2>

              <p className="
                text-zinc-500
                mt-2
              ">
                Escolha uma comunidade
              </p>

            </div>

            {/* ROOM */}

            <div className="
              p-5
              space-y-4
            ">

              <button
                className="
                  group
                  relative
                  w-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-purple-500/20
                  bg-purple-500/15
                  p-5
                  text-left
                  transition
                  hover:scale-[1.02]
                "
              >

                <div className="
                  absolute
                  inset-0
                  bg-linear-to-r
                  from-purple-500/10
                  to-fuchsia-500/10
                " />

                <div className="relative z-10">

                  <div className="
                    flex
                    items-center
                    gap-3
                    mb-3
                  ">

                    <div className="
                      w-12
                      h-12
                      rounded-2xl
                      bg-purple-500
                      flex
                      items-center
                      justify-center
                      text-xl
                    ">
                      🌎
                    </div>

                    <div>

                      <h3 className="
                        font-bold
                        text-lg
                      ">
                        Chat Global
                      </h3>

                      <p className="
                        text-sm
                        text-purple-200/70
                      ">
                        Sala principal
                      </p>

                    </div>

                  </div>

                  <div className="
                    flex
                    items-center
                    gap-2
                    text-sm
                    text-green-400
                    font-medium
                  ">

                    <div className="
                      w-2
                      h-2
                      rounded-full
                      bg-green-400
                      animate-pulse
                    " />

                    Ativo agora

                  </div>

                </div>

              </button>

            </div>

            {/* FOOTER */}

            <div className="
              mt-auto
              p-6
            ">

              <div className="
                rounded-3xl
                border
                border-white/5
                bg-[#0B0B10]
                p-6
              ">

                <h3 className="
                  font-bold
                  text-lg
                ">
                  Sobre a Comunidade
                </h3>

                <p className="
                  text-zinc-500
                  mt-3
                  leading-relaxed
                  text-sm
                ">

                  Compartilhe opiniões, descubra novos
                  doramas e participe das discussões
                  em tempo real.

                </p>

              </div>

            </div>

          </aside>

          {/* CHAT */}

          <div className="
            rounded-[36px]
            border
            border-white/10
            bg-[#111118]/80
            backdrop-blur-xl
            overflow-hidden
            shadow-[0_0_80px_rgba(168,85,247,0.08)]
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