import DramaCard from "@/components/DramaCard";
import { dramas } from "@/data/dramas";

export default function Popular() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      
      <div className="flex items-center justify-between mb-8">
        
        <h2 className="text-3xl font-bold">
          Populares da Semana
        </h2>

        <button className="text-purple-400">
          Explorar
        </button>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {dramas.map((drama) => (
            <DramaCard
            key={drama.id}
            id={drama.id}
            title={drama.title}
            image={drama.image}
            episode={drama.episode}
            />
        ))}
      </div>

    </section>
  );
}