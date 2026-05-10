const categories = [
  "Romance",
  "Ação",
  "Drama",
  "Fantasia",
  "Histórico",
  "Comédia",
  "Suspense",
  "Escolar",
];

export default function Categories() {

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="mb-10">

        <h2 className="text-4xl font-black">
          Categorias
        </h2>

        <p className="text-zinc-400 mt-2">
          Explore por gênero
        </p>

      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((category) => (

          <button
            key={category}
            className="bg-[#18181F] border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/10 transition-all duration-300 rounded-3xl p-10 text-2xl font-bold"
          >

            {category}

          </button>

        ))}

      </div>

    </section>
  );
}