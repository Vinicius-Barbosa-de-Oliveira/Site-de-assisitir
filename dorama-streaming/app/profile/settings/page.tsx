import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { authOptions } from "@/lib/auth";

import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";

import {
  Bell,
  Shield,
  Monitor,
  Moon,
  Globe,
  LogOut,
  Trash2,
  Lock,
} from "lucide-react";

export default async function SettingsPage() {

  const session =
    await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
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
              preferências da conta
            </span>

            <h1 className="text-6xl font-black mt-6">
              Configurações
            </h1>

            <p className="text-zinc-400 text-lg mt-6 max-w-2xl">
              Personalize sua experiência e gerencie sua conta.
            </p>

          </div>

        </section>

        {/* SETTINGS */}

        <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">

          {/* APARÊNCIA */}

          <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                <Monitor className="text-purple-400" size={26} />

              </div>

              <div>

                <h2 className="text-3xl font-black">
                  Aparência
                </h2>

                <p className="text-zinc-400 mt-1">
                  Ajuste o visual da plataforma
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between bg-black/20 rounded-2xl p-5">

                <div className="flex items-center gap-4">

                  <Moon size={22} className="text-zinc-400" />

                  <div>

                    <h3 className="font-semibold">
                      Tema Escuro
                    </h3>

                    <p className="text-sm text-zinc-500">
                      Ativado por padrão
                    </p>

                  </div>

                </div>

                <button className="w-14 h-8 bg-purple-500 rounded-full relative">

                  <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1" />

                </button>

              </div>

            </div>

          </div>

          {/* NOTIFICAÇÕES */}

          <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                <Bell className="text-purple-400" size={26} />

              </div>

              <div>

                <h2 className="text-3xl font-black">
                  Notificações
                </h2>

                <p className="text-zinc-400 mt-1">
                  Controle seus alertas
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center justify-between bg-black/20 rounded-2xl p-5">

                <div>

                  <h3 className="font-semibold">
                    Novos episódios
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Receba alertas quando sair um novo episódio
                  </p>

                </div>

                <button className="w-14 h-8 bg-purple-500 rounded-full relative">

                  <div className="w-6 h-6 bg-white rounded-full absolute top-1 right-1" />

                </button>

              </div>

              <div className="flex items-center justify-between bg-black/20 rounded-2xl p-5">

                <div>

                  <h3 className="font-semibold">
                    Recomendações
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    Sugestões baseadas no que você assiste
                  </p>

                </div>

                <button className="w-14 h-8 bg-white/10 rounded-full relative">

                  <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-1" />

                </button>

              </div>

            </div>

          </div>

          {/* PRIVACIDADE */}

          <div className="bg-[#18181F] border border-white/5 rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center">

                <Shield className="text-purple-400" size={26} />

              </div>

              <div>

                <h2 className="text-3xl font-black">
                  Privacidade & Segurança
                </h2>

                <p className="text-zinc-400 mt-1">
                  Proteja sua conta
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <button className="w-full flex items-center justify-between bg-black/20 hover:bg-black/30 transition rounded-2xl p-5">

                <div className="flex items-center gap-4">

                  <Lock className="text-zinc-400" size={22} />

                  <div className="text-left">

                    <h3 className="font-semibold">
                      Alterar senha
                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">
                      Atualize sua senha regularmente
                    </p>

                  </div>

                </div>

              </button>

              <button className="w-full flex items-center justify-between bg-black/20 hover:bg-black/30 transition rounded-2xl p-5">

                <div className="flex items-center gap-4">

                  <Globe className="text-zinc-400" size={22} />

                  <div className="text-left">

                    <h3 className="font-semibold">
                      Sessões ativas
                    </h3>

                    <p className="text-sm text-zinc-500 mt-1">
                      Gerencie dispositivos conectados
                    </p>

                  </div>

                </div>

              </button>

            </div>

          </div>

          {/* PERIGO */}

          <div className="bg-[#18181F] border border-red-500/20 rounded-3xl p-8">

            <div className="flex items-center gap-4 mb-8">

              <div className="w-14 h-14 rounded-2xl bg-red-500/20 flex items-center justify-center">

                <Trash2 className="text-red-400" size={26} />

              </div>

              <div>

                <h2 className="text-3xl font-black text-red-400">
                  Zona de Perigo
                </h2>

                <p className="text-zinc-400 mt-1">
                  Ações irreversíveis
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <button className="w-full bg-red-500 hover:bg-red-600 transition h-14 rounded-2xl font-semibold text-lg">

                Excluir Conta

              </button>

              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 transition h-14 rounded-2xl font-semibold flex items-center justify-center gap-3">

                <LogOut size={20} />

                Sair da Conta

              </button>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  );
}