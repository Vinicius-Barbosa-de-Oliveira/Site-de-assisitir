"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
  };
};

interface Props {
  initialMessages: MessageType[];
  sendMessage: (formData: FormData) => Promise<void>;
}

export default function CommunityChat({
  initialMessages,
  sendMessage,
}: Props) {

  const [message, setMessage] = useState("");
  const [isPending, startTransition] =
    useTransition();

  const router = useRouter();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);

  }, [router]);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [initialMessages]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!message.trim()) return;

    const formData = new FormData();

    formData.append(
      "content",
      message
    );

    startTransition(async () => {

      await sendMessage(formData);

      setMessage("");

      router.refresh();

    });

  }

  return (

    <div className="flex flex-col h-[75vh]">

      {/* CHAT */}

      <div
        className="
          flex-1
          overflow-y-auto
          rounded-3xl
          border
          border-white/5
          bg-[#18181F]
          p-6
          space-y-6
          shadow-2xl
        "
      >

        {initialMessages
          .slice()
          .reverse()
          .map((message) => (

          <div
            key={message.id}
            className="
              flex
              gap-4
              items-start
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-2xl
                bg-purple-500
                flex
                items-center
                justify-center
                font-bold
                text-lg
                shrink-0
              "
            >
              {message.user.name?.charAt(0)}
            </div>

            <div className="flex-1">

              <div
                className="
                  bg-[#0F0F14]
                  border
                  border-white/5
                  rounded-3xl
                  px-5
                  py-4
                "
              >

                <div className="flex items-center gap-3 mb-2">

                  <h3 className="font-bold text-white">
                    {message.user.name}
                  </h3>

                  <span className="text-xs text-zinc-500">

                    {new Date(
                      message.createdAt
                    ).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}

                  </span>

                </div>

                <p className="text-zinc-300 leading-relaxed wrap-break-word">
                  {message.content}
                </p>

              </div>

            </div>

          </div>

        ))}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}

      <form
        onSubmit={handleSubmit}
        className="
          mt-6
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
          rows={2}
          className="
            flex-1
            resize-none
            bg-[#18181F]
            border
            border-white/5
            rounded-3xl
            px-5
            py-4
            outline-none
            focus:border-purple-500
          "
        />

        <button
          type="submit"
          disabled={isPending}
          className="
            bg-purple-500
            hover:bg-purple-600
            transition
            px-8
            py-4
            rounded-3xl
            font-bold
            disabled:opacity-50
          "
        >

          {isPending
            ? "Enviando..."
            : "Enviar"}

        </button>

      </form>

    </div>

  );

}