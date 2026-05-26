"use client";

import Link from "next/link";

import { useRouter } from "next/navigation";

import { useState } from "react";

import {
  Flame,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function handleRegister(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    await fetch("/api/register", {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        name,
        userName: username,
        email,
        password,
      }),
    });

    setLoading(false);

    router.push("/login");
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
      <div
        className="
          absolute
          left-1/2
          top-0
          h-125
          w-700px
          -translate-x-1/2
          rounded-full
          bg-pink-500/20
          blur-[180px]
        "
      />

      <div
        className="
          relative
          z-10
          w-full
          max-w-md
          rounded-32px
          border
          border-white/10
          bg-white/5
          p-8
          backdrop-blur-2xl
        "
      >
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
            Criar Conta
          </h1>

          <p className="mt-3 text-zinc-400">
            Crie sua conta e comece a
            assistir.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="mt-10 space-y-5"
        >
          <Input
            icon={<User size={18} />}
            placeholder="Nome"
            value={name}
            onChange={setName}
          />

          <Input
            icon={<User size={18} />}
            placeholder="Username"
            value={username}
            onChange={setUsername}
          />

          <Input
            icon={<Mail size={18} />}
            placeholder="Email"
            value={email}
            onChange={setEmail}
          />

          <Input
            icon={<Lock size={18} />}
            placeholder="Senha"
            value={password}
            onChange={setPassword}
            type="password"
          />

          <button
            className="
              h-14
              w-full
              rounded-2xl
              bg-linear-to-r
              from-purple-500
              to-pink-500
              font-bold
              text-white
            "
          >
            {loading
              ? "Criando..."
              : "Criar Conta"}
          </button>
        </form>

        <p
          className="
            mt-8
            text-center
            text-sm
            text-zinc-400
          "
        >
          Já possui conta?{" "}

          <Link
            href="/login"
            className="
              font-semibold
              text-purple-400
            "
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}

type InputProps = {
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
};

function Input({
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
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
      <div className="text-zinc-400">
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
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
  );
}