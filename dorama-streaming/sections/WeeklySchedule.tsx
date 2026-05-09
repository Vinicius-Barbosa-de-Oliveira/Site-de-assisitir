interface Props {
  dramas: any[];
}

export default function WeeklySchedule({
  dramas,
}: Props) {

  return (
    <section className="space-y-6">

      <h2 className="text-3xl font-bold">
        Agenda da Semana
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        {dramas.map((drama) => {

          const ep = drama.episodes?.[0];

          if (!ep) return null;

          return (
            <div
              key={drama.id}
              className="bg-zinc-900 rounded-2xl p-5 flex gap-4"
            >

              <img
                src={drama.coverImage}
                alt={drama.title}
                className="w-24 h-32 rounded-xl object-cover"
              />

              <div className="space-y-2">

                <h3 className="font-bold text-lg">
                  {drama.title}
                </h3>

                <p className="text-zinc-400">
                  Episódio {ep.number}
                </p>

                <p className="text-purple-400 text-sm">
                  {new Date(
                    ep.releaseDate
                  ).toLocaleDateString("pt-BR")}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </section>
  );
}