import Link from "next/link";

const categories = [
  "Romance",
  "Ação",
  "Drama",
  "Comédia",
  "Fantasia",
  "Escolar",
  "Suspense",
  "Terror",
  "Histórico",
  "Mistério",
];

export default function Categories() {
  return (
    <section className="space-y-6">

      <h2 className="text-3xl font-bold">
        Categorias
      </h2>

      <div className="flex flex-wrap gap-4">

        {categories.map((category) => (
          <Link
            key={category}
            href={`/categories?genre=${category}`}
            className="bg-zinc-900 hover:bg-purple-600 transition px-5 py-3 rounded-xl font-medium"
          >
            {category}
          </Link>
        ))}

      </div>

    </section>
  );
}