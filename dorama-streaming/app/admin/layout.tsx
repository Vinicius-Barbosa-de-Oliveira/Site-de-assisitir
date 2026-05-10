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