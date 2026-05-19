import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { Camera, Lock, Mail, User } from "lucide-react";

import { updateProfile } from "@/app/actions/user";

export default async function EditProfilePage() {

  const session =
    await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user =
    await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0F14] text-white">

        {/* HERO */}

        <section className="relative overflow-hidden border-b border-white/5">

          <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 to-transparent" />

          <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">

            <span className="bg-purple-500 px-4 py-2 rounded-full text-sm font-medium">
              configurações da conta
            </span>

            <h1 className="text-6xl font-black mt-6">
              Editar Perfil
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-2xl">
              Atualize suas informações pessoais e personalize sua conta.
            </p>

          </div>

        </section>

        {/* FORM */}

        <section className="max-w-4xl mx-auto px-6 py-16">

          <div className="bg-[#18181F] border border-white/5 rounded-3xl overflow-hidden">

            {/* HEADER */}

            <div className="border-b border-white/5 p-10">

              <div className="flex flex-col md:flex-row items-center gap-8">

                {/* AVATAR */}

                <div className="relative">

                  <div className="w-36 h-36 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-6xl font-black">

                    {user.name?.[0]?.toUpperCase()}

                  </div>

                  <button
                    className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 transition flex items-center justify-center shadow-lg"
                  >

                    <Camera size={20} />

                  </button>

                </div>

                {/* INFO */}

                <div>

                  <h2 className="text-4xl font-black">
                    {user.name}
                  </h2>

                  <p className="text-zinc-400 mt-2 text-lg">
                    {user.email}
                  </p>

                  <div className="mt-6 flex gap-3">

                    <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-xl text-sm">
                      Conta ativa
                    </div>

                    <div className="bg-white/5 text-zinc-300 px-4 py-2 rounded-xl text-sm">
                      Streaming Member
                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* FORM CONTENT */}

            <form
              action={updateProfile}
              className="p-10 space-y-8"
            >

              {/* NAME */}

              <div>

                <label className="flex items-center gap-3 text-sm font-semibold mb-4 text-zinc-300">

                  <User size={18} />

                  Nome de usuário

                </label>

                <input
                  type="text"
                  name="name"
                  defaultValue={user.name}
                  className="w-full h-14 bg-[#0F0F14] border border-white/10 rounded-2xl px-5 outline-none focus:border-purple-500 transition"
                  placeholder="Seu nome"
                />

              </div>

              {/* EMAIL */}

              <div>

                <label className="flex items-center gap-3 text-sm font-semibold mb-4 text-zinc-300">

                  <Mail size={18} />

                  E-mail

                </label>

                <input
                  type="email"
                  name="email"
                  defaultValue={user.email}
                  className="w-full h-14 bg-[#0F0F14] border border-white/10 rounded-2xl px-5 outline-none focus:border-purple-500 transition"
                  placeholder="Seu email"
                />

              </div>

              {/* IMAGE */}

              <div>

                <label className="flex items-center gap-3 text-sm font-semibold mb-4 text-zinc-300">

                  <Camera size={18} />

                  URL da foto de perfil

                </label>

                <input
                  type="text"
                  name="image"
                  defaultValue={user.image || ""}
                  className="w-full h-14 bg-[#0F0F14] border border-white/10 rounded-2xl px-5 outline-none focus:border-purple-500 transition"
                  placeholder="https://..."
                />

              </div>

              {/* PASSWORD */}

              <div>

                <label className="flex items-center gap-3 text-sm font-semibold mb-4 text-zinc-300">

                  <Lock size={18} />

                  Nova senha

                </label>

                <input
                  type="password"
                  name="password"
                  className="w-full h-14 bg-[#0F0F14] border border-white/10 rounded-2xl px-5 outline-none focus:border-purple-500 transition"
                  placeholder="••••••••"
                />

                <p className="text-zinc-500 text-sm mt-3">
                  Deixe em branco caso não queira alterar sua senha.
                </p>

              </div>

              {/* BUTTONS */}

              <div className="flex flex-wrap gap-4 pt-6">

                <button
                  type="submit"
                  className="h-14 px-8 rounded-2xl bg-purple-500 hover:bg-purple-600 transition font-semibold text-lg"
                >
                  Salvar alterações
                </button>

                <button
                  type="button"
                  className="h-14 px-8 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition font-semibold"
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}