interface Props {
  dramas: any[];
  action: (formData: FormData) => void;
}

export default function EpisodeForm({
  dramas,
  action,
}: Props) {

  return (
    <form
      action={action}
      className="space-y-6"
    >

      <select
        name="dramaId"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      >

        {dramas.map((drama) => (

          <option
            key={drama.id}
            value={drama.id}
          >
            {drama.title}
          </option>

        ))}

      </select>

      <input
        name="title"
        placeholder="Título"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        type="number"
        name="number"
        placeholder="Número"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="thumbnail"
        placeholder="Thumbnail"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="videoUrl"
        placeholder="Video URL"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        type="number"
        name="duration"
        placeholder="Duração"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        type="date"
        name="releaseDate"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <button className="bg-purple-500 px-8 py-4 rounded-2xl">
        Criar Episódio
      </button>

    </form>
  );
}