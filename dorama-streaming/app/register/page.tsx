"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const router = useRouter();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await fetch(
        "/api/register",
        {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error);
        return;
      }

      alert("Conta criada!");

      router.push("/login");

    } catch (error) {

      alert("Erro ao criar conta");

    } finally {

      setLoading(false);

    }

  }

  return (
    <main className="min-h-screen bg-[#0F0F14] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#18181F] border border-white/5 rounded-3xl p-10">

        <h1 className="text-5xl font-black text-white mb-10">

          Criar Conta

        </h1>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full h-14 rounded-2xl bg-black/20 px-5 outline-none text-white"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full h-14 rounded-2xl bg-black/20 px-5 outline-none text-white"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full h-14 rounded-2xl bg-black/20 px-5 outline-none text-white"
          />

          <button
            disabled={loading}
            className="w-full h-14 rounded-2xl bg-purple-500 hover:bg-purple-600 transition font-bold text-white"
          >

            {loading
              ? "Criando..."
              : "Criar Conta"}

          </button>

        </form>

      </div>

    </main>
  );
}