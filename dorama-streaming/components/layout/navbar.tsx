"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  signOut,
  useSession,
} from "next-auth/react";

import {
  Menu,
  Search,
  X,
  Flame,
  CalendarDays,
  Users,
  LayoutDashboard,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const { data: session } =
    useSession();

  const role = (
    session?.user as any
  )?.role;

  const isAdmin =
    typeof role === "string" &&
    role.toUpperCase() === "ADMIN";

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const router = useRouter();

  function handleSearch(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!search.trim()) return;

    router.push(
      `/categories?search=${encodeURIComponent(
        search
      )}`
    );
  }

  return (
    <header
      className="
        sticky
        top-0
        z-50
        border-b
        border-white/10
        bg-[#0B0B11]/70
        backdrop-blur-2xl
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
        "
      >
        {/* LOGO */}

        <Link
          href="/"
          className="
            flex
            items-center
            gap-3
          "
        >
          <div
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              bg-linear-to-br
              from-purple-500
              to-pink-500
              shadow-lg
              shadow-purple-500/30
            "
          >
            <Flame size={20} />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-black
                tracking-tight
                text-white
              "
            >
              Dorama
              <span className="text-purple-400">
                Stream
              </span>
            </h1>
          </div>
        </Link>

        {/* DESKTOP NAV */}

        <nav
          className="
            hidden
            items-center
            gap-8
            lg:flex
          "
        >
          <NavItem
            href="/"
            label="Início"
          />

          <NavItem
            href="/categories"
            label="Categorias"
          />

          <NavItem
            href="/schedule"
            label="Calendário"
          />

          <NavItem
            href="/community"
            label="Comunidade"
          />

        </nav>

        {/* RIGHT SIDE */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >
          {/* SEARCH */}

          <form
            onSubmit={handleSearch}
            className="
              hidden
              h-12
              items-center
              gap-3
              rounded-2xl
              border
              border-white/10
              bg-white/5
              px-4
              transition
              focus-within:border-purple-500/50
              focus-within:bg-white/10
              md:flex
            "
          >
            <Search
              size={18}
              className="text-zinc-400"
            />

            <input
              type="text"
              placeholder="Buscar dorama..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-52
                bg-transparent
                text-sm
                text-white
                outline-none
                placeholder:text-zinc-500
              "
            />
          </form>

          {/* USER */}

          {session?.user ? (
            <div className="hidden items-center gap-3 md:flex">
              {/* PROFILE */}

              <Link
                href="/profile"
                className="
                  group
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/4
                  px-3
                  py-2
                  transition
                  hover:border-purple-500/30
                  hover:bg-white/[0.07]
                "
              >
                {/* AVATAR */}

                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-linear-to-br
                    from-fuchsia-500
                    to-pink-500
                    text-sm
                    font-bold
                    text-white
                  "
                >
                  {session.user.name?.[0] ||
                    "U"}
                </div>

                {/* INFO */}

                <div className="leading-tight">
                  <p
                    className="
                      max-w-27.5
                      truncate
                      text-sm
                      font-semibold
                      text-white
                    "
                  >
                    {session.user.name}
                  </p>

                  <p
                    className="
                      text-[11px]
                      uppercase
                      tracking-wider
                      text-zinc-500
                    "
                  >
                    {
                      (
                        session.user as any
                      )?.role
                    }
                  </p>
                </div>
              </Link>

              {/* LOGOUT */}

              <button
                onClick={() =>
                  signOut()
                }
                className="
                  flex
                  h-12
                  items-center
                  gap-2
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/4
                  px-4
                  text-sm
                  text-zinc-300
                  transition
                  hover:border-red-500/30
                  hover:bg-red-500/10
                  hover:text-red-300
                "
              >
                <LogOut size={16} />
                Sair
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/login"
                className="
                  flex
                  h-11
                  items-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/5
                  px-5
                  text-sm
                  font-medium
                  text-zinc-300
                  transition
                  hover:bg-white/10
                  hover:text-white
                "
              >
                Entrar
              </Link>

              <Link
                href="/register"
                className="
                  flex
                  h-11
                  items-center
                  rounded-2xl
                  bg-linear-to-r
                  from-purple-500
                  to-pink-500
                  px-5
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-purple-500/20
                  transition
                  hover:scale-105
                "
              >
                Criar Conta
              </Link>
            </div>
          )}

          {/* MOBILE BUTTON */}

          <button
            onClick={() =>
              setMobileMenu(
                !mobileMenu
              )
            }
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-2xl
              border
              border-white/10
              bg-white/5
              text-white
              transition
              hover:bg-white/10
              lg:hidden
            "
          >
            {mobileMenu ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (
        <div
          className="
            border-t
            border-white/10
            bg-[#0B0B11]
            lg:hidden
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              p-6
            "
          >
            <MobileItem
              href="/"
              label="Início"
              icon={<Flame size={18} />}
            />

            <MobileItem
              href="/categories"
              label="Categorias"
              icon={
                <LayoutDashboard
                  size={18}
                />
              }
            />

            <MobileItem
              href="/schedule"
              label="Calendário"
              icon={
                <CalendarDays
                  size={18}
                />
              }
            />

            <MobileItem
              href="/community"
              label="Comunidade"
              icon={<Users size={18} />}
            />


            {/* MOBILE SEARCH */}

            <form
              onSubmit={handleSearch}
              className="
                mt-2
                flex
                h-12
                items-center
                gap-3
                rounded-2xl
                border
                border-white/10
                bg-white/5
                px-4
              "
            >
              <Search
                size={18}
                className="text-zinc-400"
              />

              <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  flex-1
                  bg-transparent
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-zinc-500
                "
              />
            </form>

            {/* MOBILE AUTH */}

            {session?.user ? (
              <button
                onClick={() =>
                  signOut()
                }
                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  rounded-2xl
                  border
                  border-red-500/20
                  bg-red-500/10
                  px-4
                  py-4
                  text-red-300
                  transition
                  hover:bg-red-500/20
                "
              >
                <LogOut size={18} />
                Sair
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-4
                    text-zinc-200
                  "
                >
                  Entrar
                </Link>

                <Link
                  href="/register"
                  className="
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    bg-linear-to-r
                    from-purple-500
                    to-pink-500
                    px-4
                    py-4
                    font-semibold
                    text-white
                  "
                >
                  Criar Conta
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

type NavItemProps = {
  href: string;
  label: string;
};

function NavItem({
  href,
  label,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className="
        relative
        text-sm
        font-medium
        text-zinc-300
        transition
        hover:text-white
      "
    >
      {label}
    </Link>
  );
}

type MobileItemProps = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

function MobileItem({
  href,
  label,
  icon,
}: MobileItemProps) {
  return (
    <Link
      href={href}
      className="
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/10
        bg-white/5
        px-4
        py-4
        text-zinc-200
        transition
        hover:bg-white/10
      "
    >
      {icon}

      <span>{label}</span>
    </Link>
  );
}