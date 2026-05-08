import Link from "next/link";

const categories = [
  "Romance",
  "Ação",
  "Drama",
  "Fantasia",
  "Histórico",
  "Comédia",
  "Mistério",
  "Escolar",
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-4xl font-bold">
            Categorias
          </h2>

          <p className="text-zinc-400 mt-2">
            Explore por gênero
          </p>

        </div>

      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

        {categories.map((category) => (

          <Link
            key={category}
            href={`/categories?genre=${category}`}
            className="bg-[#18181F] hover:bg-purple-500 transition rounded-3xl p-8 text-center border border-white/5"
          >

            <h3 className="text-2xl font-bold">
              {category}
            </h3>

          </Link>

        ))}

      </div>

    </section>
  );
}