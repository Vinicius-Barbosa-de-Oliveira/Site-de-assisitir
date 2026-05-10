interface Props {
  action: (formData: FormData) => void;
}

export default function DramaForm({
  action,
}: Props) {

  return (
    <form
      action={action}
      className="space-y-6"
    >

      <input
        name="title"
        placeholder="Título"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="slug"
        placeholder="slug"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <textarea
        name="description"
        placeholder="Descrição"
        className="w-full bg-[#18181F] rounded-2xl p-4 h-40"
      />

      <input
        name="coverImage"
        placeholder="Cover URL"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="bannerImage"
        placeholder="Banner URL"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="country"
        placeholder="País"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        type="number"
        name="year"
        placeholder="Ano"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Nota"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="status"
        placeholder="Status"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="scheduleDay"
        placeholder="Dia da semana"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <input
        name="scheduleTime"
        placeholder="Horário"
        className="w-full bg-[#18181F] rounded-2xl p-4"
      />

      <button className="bg-purple-500 px-8 py-4 rounded-2xl font-bold">
        Salvar
      </button>

    </form>
  );
}