import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#0B0B11] text-white">

      <div className="grid lg:grid-cols-[260px_1fr]">

        {/* SIDEBAR */}

        <aside className="hidden lg:block min-h-screen border-r border-white/5 bg-[#111116] p-6 sticky top-0">

          <h1 className="text-3xl font-black">
            DORAMA
          </h1>

          <nav className="mt-12 space-y-3">

            <Link
              href="/admin"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              🎬 Dashboard
            </Link>

            <Link
              href="/admin/dramas"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              📺 Doramas
            </Link>

            <Link
              href="/admin/episodes"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              🎞 Episódios
            </Link>

            <Link
              href="/admin/genres"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              � Gêneros
            </Link>

            <Link
              href="/admin/users"
              className="flex items-center gap-3 px-5 py-4 rounded-2xl hover:bg-white/5 transition"
            >
              👥 Usuários
            </Link>

            <Link
              href="/"
              className="bg-white/5 hover:bg-white/10 transition px-8 py-5 rounded-3xl font-bold border border-white/5 mt-6 block text-center"
            >
              Sair
            </Link>

          </nav>

        </aside>

        {/* CONTENT */}

        <section>
          {children}
        </section>

      </div>

    </main>
  );
}