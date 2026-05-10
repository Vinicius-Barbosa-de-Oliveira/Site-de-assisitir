"use client";

import { useRouter } from "next/navigation";

import {
  useSession,
  signOut,
} from "next-auth/react";

import {
  LogOut,
  Shield,
} from "lucide-react";

export default function UserMenu() {

  const router = useRouter();
  const {
    data: session,
  } = useSession();

  if (!session) {

    return (

      <div className="flex items-center gap-3">

        <button
          onClick={() => router.push("/login")}
          className="text-sm text-white/70 hover:text-white transition"
        >
          Entrar
        </button>

        <button
          onClick={() => router.push("/register")}
          className="bg-purple-500 hover:bg-purple-600 transition px-4 py-2 rounded-xl text-sm font-semibold"
        >
          Registrar
        </button>

      </div>

    );

  }

  const role = (session.user as any)?.role;
  const isAdmin =
    typeof role === "string" &&
    role.toUpperCase() === "ADMIN";

  return (

    <div className="flex items-center gap-4">

      {isAdmin ? (
        <button
          onClick={() => router.push("/admin")}
          className="flex items-center gap-3 text-yellow-400 hover:text-yellow-300 cursor-pointer transition"
        >

          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">
            <Shield size={18} />
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-white">
              Dashboard Admin
            </p>
            <p className="text-xs text-white/50">
              {session.user?.email}
            </p>
          </div>

        </button>
      ) : (
        <button
          onClick={() => router.push("/profile")}
          className="flex items-center gap-3 hover:opacity-80 cursor-pointer transition"
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

        </button>
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