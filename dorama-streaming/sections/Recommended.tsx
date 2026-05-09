import DramaCard from "@/components/DramaCard";

interface Props {
  dramas: any[];
}

export default function Recommended({
  dramas,
}: Props) {
  return (
    <section className="space-y-4">

      <h2 className="text-3xl font-bold">
        Recomendados
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {dramas.map((drama) => (
          <DramaCard
            key={drama.id}
            drama={drama}
          />
        ))}

      </div>

    </section>
  );
}