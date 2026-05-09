"use client";

import Link from "next/link";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  User,
  LogOut,
  Shield,
} from "lucide-react";

export default function UserMenu() {

  const {
    data: session,
  } = useSession();

  if (!session) {

    return (

      <div className="flex items-center gap-3">

        <Link
          href="/login"
          className="text-sm text-white/70 hover:text-white transition"
        >
          Entrar
        </Link>

        <Link
          href="/register"
          className="bg-purple-500 hover:bg-purple-600 transition px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Registrar
        </Link>

      </div>

    );

  }

  return (

    <div className="flex items-center gap-4">

      <Link
        href="/profile"
        className="flex items-center gap-3"
      >

        <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">

          {session.user?.name?.[0]}

        </div>

        <div className="hidden md:block">

          <p className="text-sm font-semibold text-white">

            {session.user?.name}

          </p>

          <p className="text-xs text-white/50">

            {session.user?.email}

          </p>

        </div>

      </Link>

      {(session.user as any)?.role ===
        "ADMIN" && (

        <Link
          href="/admin"
          className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300"
        >

          <Shield size={18} />

          Admin

        </Link>

      )}

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/",
          })
        }
        className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300"
      >

        <LogOut size={18} />

        Sair

      </button>

    </div>

  );

}