"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import {
  UserPlus,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      setError("");

      const response =
        await fetch("/api/register", {

          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            name,
            email,
            password,
          }),

        });

      const data =
        await response.json();

      if (!response.ok) {

        setError(
          data.error ||
            "Erro ao criar conta"
        );

        return;

      }

      router.push("/login");

    } catch {

      setError(
        "Erro ao criar conta"
      );

    } finally {

      setLoading(false);

    }

  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0F14] relative overflow-hidden flex items-center justify-center px-6 py-20">

        {/* BACKGROUND */}

        <div className="absolute inset-0 overflow-hidden">

          <div className="absolute top-0 right-0 w-150 h-150 bg-purple-500/20 blur-[140px] rounded-full" />

          <div className="absolute bottom-0 left-0 w-125 h-125 bg-fuchsia-500/10 blur-[120px] rounded-full" />

        </div>

        {/* CONTENT */}

        <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 backdrop-blur-xl bg-white/3 shadow-2xl">

          {/* LEFT SIDE */}

          <div className="hidden lg:flex flex-col justify-between p-14 relative overflow-hidden bg-linear-to-br from-purple-600 via-purple-700 to-fuchsia-700">

            <div className="absolute inset-0 bg-black/10" />

            <div className="relative z-10">

              <div className="flex items-center gap-3 mb-10">

                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center">

                  <Sparkles size={28} />

                </div>

                <div>

                  <h2 className="text-3xl font-black">
                    Dorama Streaming
                  </h2>

                  <p className="text-white/70">
                    Sua plataforma premium
                  </p>

                </div>

              </div>

              <h1 className="text-6xl font-black leading-tight">

                Crie sua
                <br />
                conta agora.

              </h1>

              <p className="text-white/80 text-lg leading-8 mt-8 max-w-md">

                Salve favoritos, acompanhe episódios,
                continue assistindo e personalize sua experiência.

              </p>

            </div>

            {/* STATS */}

            <div className="relative z-10 grid grid-cols-2 gap-5">

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">

                <h3 className="text-4xl font-black">
                  +500
                </h3>

                <p className="text-white/70 mt-2">
                  Doramas
                </p>

              </div>

              <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/10">

                <h3 className="text-4xl font-black">
                  +2K
                </h3>

                <p className="text-white/70 mt-2">
                  Episódios
                </p>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}

          <div className="p-8 md:p-14 flex items-center">

            <div className="w-full">

              {/* MOBILE HEADER */}

              <div className="lg:hidden mb-10 text-center">

                <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-purple-500 to-purple-700 mx-auto flex items-center justify-center mb-6 shadow-2xl">

                  <UserPlus size={36} />

                </div>

                <h1 className="text-5xl font-black">
                  Criar Conta
                </h1>

                <p className="text-zinc-400 mt-4">
                  Entre para a plataforma
                </p>

              </div>

              {/* DESKTOP HEADER */}

              <div className="hidden lg:block mb-10">

                <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-4 py-2 rounded-full text-sm font-semibold">

                  novo usuário

                </span>

                <h1 className="text-5xl font-black mt-6">
                  Criar Conta
                </h1>

                <p className="text-zinc-400 text-lg mt-4">

                  Comece sua jornada no mundo dos doramas.

                </p>

              </div>

              {/* ERROR */}

              {error && (

                <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-red-400">

                  {error}

                </div>

              )}

              {/* FORM */}

              <form
                onSubmit={handleRegister}
                className="space-y-6"
              >

                {/* NAME */}

                <div>

                  <label className="block text-sm font-semibold text-zinc-300 mb-3">

                    Nome

                  </label>

                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-2xl bg-[#0F0F14] border border-white/10 px-5 outline-none focus:border-purple-500 transition"
                  />

                </div>

                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold text-zinc-300 mb-3">

                    Email

                  </label>

                  <input
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                    className="w-full h-14 rounded-2xl bg-[#0F0F14] border border-white/10 px-5 outline-none focus:border-purple-500 transition"
                  />

                </div>

                {/* PASSWORD */}

                <div>

                  <label className="block text-sm font-semibold text-zinc-300 mb-3">

                    Senha

                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Crie uma senha segura"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      className="w-full h-14 rounded-2xl bg-[#0F0F14] border border-white/10 px-5 pr-14 outline-none focus:border-purple-500 transition"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                    >

                      {showPassword ? (
                        <EyeOff size={22} />
                      ) : (
                        <Eye size={22} />
                      )}

                    </button>

                  </div>

                </div>

                {/* TERMS */}

                <label className="flex items-start gap-3 text-sm text-zinc-400 cursor-pointer">

                  <input
                    type="checkbox"
                    required
                    className="mt-1 accent-purple-500"
                  />

                  <span>

                    Concordo com os termos de uso e política
                    de privacidade da plataforma.

                  </span>

                </label>

                {/* BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-2xl bg-linear-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 disabled:opacity-50 transition font-bold text-lg shadow-2xl shadow-purple-500/20"
                >

                  {loading
                    ? "Criando..."
                    : "Criar Conta"}

                </button>

              </form>

              {/* LOGIN */}

              <div className="mt-10 pt-8 border-t border-white/5 text-center">

                <p className="text-zinc-400">

                  Já possui uma conta?{" "}

                  <Link
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 font-semibold transition"
                  >

                    Entrar agora

                  </Link>

                </p>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}