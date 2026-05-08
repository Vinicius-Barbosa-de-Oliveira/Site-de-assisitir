"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {

  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();

  const [search, setSearch] = useState("");
  function handleSearch(e: React.FormEvent) {

    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/categories?search=${encodeURIComponent(search)}`
    );

  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0F0F14]/80 backdrop-blur-2xl">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}

        <Link
          href="/"
          className="text-3xl font-black tracking-tight"
        >
          <span className="text-white">
            D
          </span>

          <span className="text-purple-500">
            orama
          </span>
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden lg:flex items-center gap-8">

          <Link
            href="/"
            className="text-zinc-300 hover:text-white transition"
          >
            Início
          </Link>

          <Link
            href="/categories"
            className="text-zinc-300 hover:text-white transition"
          >
            Categorias
          </Link>

          <Link
            href="/"
            className="text-zinc-300 hover:text-white transition"
          >
            Filmes
          </Link>

          <Link
            href="/schedule"
            className="text-zinc-300 hover:text-white transition"
          >
            Calendário
          </Link>

          <Link
            href="/"
            className="text-zinc-300 hover:text-white transition"
          >
            Comunidade
          </Link>

        </nav>

        {/* ACTIONS */}

        <div className="flex items-center gap-4">

          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 h-12"
          >

            <input
              type="text"
              placeholder="Buscar dorama..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="bg-transparent outline-none text-sm w-52 text-white placeholder:text-zinc-500"
            />

          </form>

          {/* PROFILE */}

          <button className="w-12 h-12 rounded-full bg-purple-500 hover:bg-purple-600 transition font-bold">
            D
          </button>

          {/* MOBILE BUTTON */}

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="lg:hidden flex flex-col gap-1"
          >

            <span className="w-6 h-2px bg-white" />
            <span className="w-6 h-2px bg-white" />
            <span className="w-6 h-2px bg-white" />

          </button>

        </div>

      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="lg:hidden border-t border-white/10 bg-[#0F0F14]">

          <div className="flex flex-col p-6 gap-6">

            <Link
              href="/"
              className="text-zinc-300"
            >
              Início
            </Link>

            <Link
              href="/"
              className="text-zinc-300"
            >
              Doramas
            </Link>

            <Link
              href="/"
              className="text-zinc-300"
            >
              Filmes
            </Link>

            <Link
              href="/"
              className="text-zinc-300"
            >
              Calendário
            </Link>

            <Link
              href="/"
              className="text-zinc-300"
            >
              Comunidade
            </Link>

            {/* SEARCH MOBILE */}

            <form
              onSubmit={handleSearch}
              className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 h-12"
            >

              <input
                type="text"
                placeholder="Buscar dorama..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="bg-transparent outline-none text-sm w-52 text-white placeholder:text-zinc-500"
              />

            </form>

          </div>

        </div>

      )}

    </header>
  );
}