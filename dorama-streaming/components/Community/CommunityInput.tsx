"use client";

import {
  Send,
} from "lucide-react";

interface Props {
  message: string;

  setMessage: (
    value: string
  ) => void;

  onSubmit: (
    e: React.FormEvent<HTMLFormElement>
  ) => void;

  isPending: boolean;
}

export default function CommunityInput({
  message,
  setMessage,
  onSubmit,
  isPending,
}: Props) {

  return (

    <form
      onSubmit={onSubmit}
      className="
        border-t
        border-white/5
        bg-[#12121A]
        px-8
        py-6
      "
    >

      <div
        className="
          flex
          gap-4
          items-end
        "
      >

        <textarea
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Digite sua mensagem..."
          rows={1}
          className="
            community-scroll
            flex-1
            max-h-40
            min-h-15
            resize-none
            overflow-y-auto
            bg-[#18181F]
            border
            border-white/5
            rounded-3xl
            px-6
            py-5
            outline-none
            focus:border-purple-500
            transition-all
            text-white
            placeholder:text-zinc-500
          "
        />

        <button
          type="submit"
          disabled={isPending}
          className="
            bg-linear-to-r
            from-purple-500
            to-fuchsia-500
            hover:scale-[1.03]
            transition-all
            duration-300
            px-8
            py-5
            rounded-3xl
            font-black
            disabled:opacity-50
          "
        >

          <span
            className="
              flex
              items-center
              gap-3
            "
          >

            {isPending
              ? "Enviando..."
              : "Enviar"}

            <Send className="w-5 h-5" />

          </span>

        </button>

      </div>

    </form>

  );

}