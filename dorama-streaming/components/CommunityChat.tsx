"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { useRouter } from "next/navigation";

import {
  sendCommunityMessage,
} from "@/app/actions/community-actions";

import {
  Send,
  Sparkles,
} from "lucide-react";

type Message = {
  id: string;
  content: string;
  createdAt: Date;

  user: {
    name: string | null;
  };
};

interface Props {
  initialMessages: Message[];
}

export default function CommunityChat({
  initialMessages,
}: Props) {

  const [message, setMessage] =
    useState("");

  const [isPending, startTransition] =
    useTransition();

  const router =
    useRouter();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    const interval =
      setInterval(() => {

        router.refresh();

      }, 3000);

    return () =>
      clearInterval(interval);

  }, [router]);

  useEffect(() => {

    const container =
      bottomRef.current?.parentElement?.parentElement;

    if (container) {

      container.scrollTop =
        container.scrollHeight;

    }

  }, [initialMessages]);

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "content",
      message
    );

    startTransition(async () => {

      await sendCommunityMessage(
        formData
      );

      setMessage("");

      router.refresh();

    });

  }

  return (

    <div className="flex flex-col h-[75vh]">

      {/* HEADER */}

      <div
        className="
          relative
          overflow-hidden
          border-b
          border-white/5
          px-8
          py-6
          bg-[#12121A]
        "
      >

        <div
          className="
            absolute
            top-0
            right-0
            w-72
            h-72
            bg-purple-500/10
            blur-3xl
            rounded-full
          "
        />

        <div className="relative z-10 flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-linear-to-br
                  from-purple-500
                  to-fuchsia-500
                  flex
                  items-center
                  justify-center
                  shadow-lg
                  shadow-purple-500/20
                "
              >

                <Sparkles className="w-6 h-6" />

              </div>

              <div>

                <h2 className="text-2xl font-black">
                  Chat Global
                </h2>

                <p className="text-zinc-400 text-sm mt-1">
                  Converse com outros fãs em tempo real
                </p>

              </div>

            </div>

          </div>

          <div
            className="
              hidden
              md:flex
              items-center
              gap-3
              bg-[#1A1A24]
              border
              border-white/5
              px-4
              py-3
              rounded-2xl
            "
          >

            <div
              className="
                w-3
                h-3
                rounded-full
                bg-green-500
                animate-pulse
              "
            />

            <span className="text-sm text-zinc-300">
              Comunidade Online
            </span>

          </div>

        </div>

      </div>

      {/* CHAT */}

      <div
        className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          px-8
          py-8
          bg-[#0D0D12]
          min-h-0
        "
      >

        <div
          className="
            flex
            flex-col
            justify-end
            min-h-full
            gap-6
          "
        >

          {initialMessages.map((message) => (

            <div
              key={message.id}
              className="
                group
                flex
                gap-4
                items-start
              "
            >

              {/* AVATAR */}

              <div
                className="
                  relative
                  shrink-0
                "
              >

                <div
                  className="
                    absolute
                    inset-0
                    rounded-2xl
                    bg-purple-500/40
                    blur-xl
                    opacity-0
                    group-hover:opacity-100
                    transition
                  "
                />

                <div
                  className="
                    relative
                    w-13
                    h-13
                    rounded-2xl
                    bg-linear-to-br
                    from-purple-500
                    to-fuchsia-500
                    flex
                    items-center
                    justify-center
                    font-black
                    text-lg
                    shadow-lg
                    shadow-purple-500/20
                  "
                >

                  {message.user.name
                    ?.charAt(0)
                    ?.toUpperCase() || "U"}

                </div>

              </div>

              {/* MESSAGE */}

              <div className="flex-1">

                <div
                  className="
                    relative
                    overflow-hidden
                    bg-[#15151D]
                    border
                    border-white/5
                    rounded-[28px]
                    px-6
                    py-5
                    transition-all
                    duration-300
                    group-hover:border-purple-500/20
                    group-hover:bg-[#181822]
                  "
                >

                  <div
                    className="
                      absolute
                      top-0
                      right-0
                      w-40
                      h-40
                      bg-purple-500/5
                      blur-3xl
                      rounded-full
                    "
                  />

                  <div className="relative z-10">

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        mb-3
                      "
                    >

                      <h3
                        className="
                          font-black
                          text-white
                          text-sm
                          tracking-wide
                        "
                      >

                        {message.user.name}

                      </h3>

                      <div
                        className="
                          w-1
                          h-1
                          rounded-full
                          bg-zinc-600
                        "
                      />

                      <span
                        className="
                          text-xs
                          text-zinc-500
                          font-medium
                        "
                      >

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

                    <p
                      className="
                        text-zinc-300
                        leading-8
                        whitespace-pre-wrap
                        break-words
                        text-[15px]
                      "
                    >

                      {message.content}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* INPUT */}

      <form
        onSubmit={handleSubmit}
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

          <div className="flex-1 relative">

            <div
              className="
                absolute
                inset-0
                rounded-3xl
                bg-purple-500/10
                blur-2xl
              "
            />

            <textarea
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              placeholder="Digite sua mensagem..."
              rows={2}
              className="
                relative
                w-full
                resize-none
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

          </div>

          <button
            type="submit"
            disabled={isPending}
            className="
              group
              relative
              overflow-hidden
              bg-linear-to-r
              from-purple-500
              to-fuchsia-500
              hover:scale-[1.03]
              active:scale-[0.98]
              transition-all
              duration-300
              px-8
              py-5
              rounded-3xl
              font-black
              shadow-xl
              shadow-purple-500/20
              disabled:opacity-50
              disabled:hover:scale-100
            "
          >

            <div
              className="
                absolute
                inset-0
                bg-white/10
                opacity-0
                group-hover:opacity-100
                transition
              "
            />

            <span
              className="
                relative
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

    </div>

  );

}