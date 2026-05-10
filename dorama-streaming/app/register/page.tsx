"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import Link from "next/link";

import Navbar from "@/components/Navbar";

import Footer from "@/components/Footer";

import { UserPlus } from "lucide-react";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleRegister(e: React.FormEvent) {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao criar conta");
        return;
      }

      alert("Conta criada com sucesso!");
      router.push("/login");

    } catch (error) {
      setError("Erro ao criar conta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#0F0F14] flex items-center justify-center px-6 py-20">

        <div className="w-full max-w-md">

          <div className="mb-12 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <UserPlus size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-black text-white mb-3">
              Criar Conta
            </h1>
            <p className="text-white/60">
              Junte-se a milhares de fãs de doramas
            </p>
          </div>

          <div className="bg-[#18181F] border border-white/5 hover:border-purple-500/20 transition rounded-3xl p-10 backdrop-blur-sm">

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">

              <div>
                <label className="text-white/70 text-sm font-semibold mb-2 block">
                  Nome
                </label>
                <input
                  type="text"
                  placeholder="Seu nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full h-12 rounded-xl bg-black/30 px-4 outline-none text-white placeholder:text-white/30 border border-white/5 focus:border-purple-500/40 transition"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm font-semibold mb-2 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 rounded-xl bg-black/30 px-4 outline-none text-white placeholder:text-white/30 border border-white/5 focus:border-purple-500/40 transition"
                />
              </div>

              <div>
                <label className="text-white/70 text-sm font-semibold mb-2 block">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="Crie uma senha segura"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 rounded-xl bg-black/30 px-4 outline-none text-white placeholder:text-white/30 border border-white/5 focus:border-purple-500/40 transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50 transition font-bold text-white mt-8"
              >
                {loading ? "Criando..." : "Criar Conta"}
              </button>

            </form>

            <div className="mt-8 pt-8 border-t border-white/5">
              <p className="text-white/60 text-center text-sm">
                Já tem uma conta?{" "}
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

      </main>

      <Footer />
    </>
  );
}