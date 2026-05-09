"use client";

import { useState } from "react";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

export default function LoginPage() {

const router = useRouter();

const [email, setEmail] =
    useState("");

const [password, setPassword] =
    useState("");

const [loading, setLoading] =
    useState(false);

async function handleLogin(
    e: React.FormEvent
) {

    e.preventDefault();

    setLoading(true);

    const response =
    await signIn("credentials", {

        email,

        password,

        redirect: false,
    });

    setLoading(false);

    if (response?.error) {

    alert(
        "Email ou senha inválidos"
    );

    return;

    }

    router.push("/");

}

return (
    <main className="min-h-screen bg-[#0F0F14] flex items-center justify-center px-6">

    <div className="w-full max-w-md bg-[#18181F] border border-white/5 rounded-3xl p-10">

        <h1 className="text-5xl font-black text-white mb-10">

        Entrar

        </h1>

        <form
        onSubmit={handleLogin}
        className="space-y-5"
        >

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
            ? "Entrando..."
            : "Entrar"}

        </button>

        </form>

    </div>

    </main>
);
}