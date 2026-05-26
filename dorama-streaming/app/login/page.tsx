"use client";

import Link from "next/link";

import { signIn } from "next-auth/react";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  Flame,
  Mail,
  Lock,
} from "lucide-react";

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

    const res = await signIn(
      "credentials",
      {
        email,
        password,
        redirect: false,
      }
    );

    setLoading(false);

    if (res?.ok) {
      router.push("/");
    }
  }

  return (
    <main
      className="
        relative
        flex
        min-h-screen
        items-center
        justify-center
        overflow-hidden
        bg-[#0B0B11]
        px-6
      "
    >
      {/* BG */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-125
          w-175
          -translate-x-1/2
          rounded-full
          bg-purple-500/20
          blur-[180px]
        "
      />

      {/* CARD */}

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-4xl
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-2xl
        "
      >
        {/* LOGO */}

        <div className="flex justify-center">
          <div
            className="
              flex
              h-18
              w-18
              items-center
              justify-center
              rounded-3xl
              bg-linear-to-br
              from-purple-500
              to-pink-500
              shadow-2xl
              shadow-purple-500/30
            "
          >
            <Flame size={34} />
          </div>
        </div>

        <div className="mt-8 text-center">
          <h1
            className="
              text-4xl
              font-black
              text-white
            "
          >
            Bem-vindo
          </h1>

          <p className="mt-3 text-zinc-400">
            Entre na sua conta para
            continuar assistindo.
          </p>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="mt-10 space-y-5"
        >
          {/* EMAIL */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              h-14
            "
          >
            <Mail
              size={18}
              className="text-zinc-400"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                flex-1
                bg-transparent
                outline-none
                text-white
                placeholder:text-zinc-500
              "
            />
          </div>

          {/* PASSWORD */}

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              h-14
            "
          >
            <Lock
              size={18}
              className="text-zinc-400"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                flex-1
                bg-transparent
                outline-none
                text-white
                placeholder:text-zinc-500
              "
            />
          </div>

          {/* BUTTON */}

          <button
            disabled={loading}
            className="
              h-14
              w-full
              rounded-2xl
              bg-linear-to-r
              from-purple-500
              to-pink-500
              font-bold
              text-white
              shadow-xl
              shadow-purple-500/20
              transition
              hover:scale-[1.02]
            "
          >
            {loading
              ? "Entrando..."
              : "Entrar"}
          </button>
        </form>

        {/* GOOGLE */}

        <button
          onClick={() =>
            signIn("google")
          }
          className="
            mt-5
            h-14
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            font-semibold
            text-white
            transition
            hover:bg-white/10
          "
        >
          Continuar com Google
        </button>

        {/* REGISTER */}

        <p
          className="
            mt-8
            text-center
            text-sm
            text-zinc-400
          "
        >
          Não possui conta?{" "}

          <Link
            href="/register"
            className="
              font-semibold
              text-purple-400
            "
          >
            Criar conta
          </Link>
        </p>
      </div>
    </main>
  );
}