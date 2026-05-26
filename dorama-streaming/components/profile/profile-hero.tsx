import Link from "next/link";

import { Settings } from "lucide-react";

export default function ProfileHero({
  user,
}: any) {
  return (
    <section className="relative overflow-hidden border-b border-white/5 py-20">
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-5xl font-black shadow-[0_0_60px_rgba(168,85,247,0.45)]">
          {user.name?.[0]?.toUpperCase()}
        </div>

        <div className="flex-1">
          <h1 className="text-5xl font-black">
            {user.name}
          </h1>

          <p className="mt-3 text-zinc-400">
            {user.email}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/profile/settings"
              className="flex items-center gap-2 rounded-2xl bg-purple-500 px-6 py-3 font-semibold transition hover:bg-purple-600"
            >
              <Settings size={18} />
              Configurações
            </Link>

            <Link
              href="/categories"
              className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 font-semibold transition hover:bg-white/10"
            >
              Explorar Doramas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}