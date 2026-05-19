"use client";

import {
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import { useSession } from "next-auth/react";

import { socket } from "@/lib/socket";

import {
  sendCommunityMessage,
  deleteCommunityMessage,
} from "@/app/actions/community-actions";

import CommunityMessage from "./CommunityMessage";

import CommunityInput from "./CommunityInput";

import { CommunityMessageType } from "./types";

interface Props {
  initialMessages: CommunityMessageType[];
}

export default function CommunityChat({
  initialMessages,
}: Props) {

  const [messages, setMessages] =
    useState(initialMessages);

  const [message, setMessage] =
    useState("");

  const [openMenuId, setOpenMenuId] =
    useState<string | null>(null);

  const [isPending, startTransition] =
    useTransition();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useSession();

  // SOCKET

  useEffect(() => {

    socket.connect();

    socket.on(
      "new-message",
      (newMessage) => {

        setMessages((prev) => {

          const exists =
            prev.some(
              (m) =>
                m.id === newMessage.id
            );

          if (exists) {
            return prev;
          }

          return [
            ...prev,
            newMessage,
          ];

        });

      }
    );

    socket.on(
      "message-deleted",
      ({ id }) => {

        setMessages((prev) =>
          prev.map((msg) => {

            if (msg.id !== id) {
              return msg;
            }

            return {
              ...msg,
              deleted: true,
            };

          })
        );

      }
    );

    return () => {

      socket.disconnect();

    };

  }, []);

  // AUTO SCROLL

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  // SEND

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    const clean =
      message.trim();

    if (!clean) {
      return;
    }

    const formData =
      new FormData();

    formData.append(
      "content",
      clean
    );

    setMessage("");

    startTransition(async () => {

      await sendCommunityMessage(
        formData
      );

    });

  }

  // DELETE

  async function handleDelete(
    id: string
  ) {

    const confirmed =
      confirm(
        "Deseja apagar esta mensagem?"
      );

    if (!confirmed) {
      return;
    }

    await deleteCommunityMessage(id);

    setMessages((prev) =>
      prev.map((msg) => {

        if (msg.id !== id) {
          return msg;
        }

        return {
          ...msg,
          deleted: true,
        };

      })
    );

  }

  return (

    <div className="flex flex-col h-[75vh]">

      {/* CHAT */}

      <div
        className="
            community-scroll
          flex-1
          overflow-y-auto
          px-8
          py-8
          space-y-6
          bg-[#0D0D12]
        "
      >

        {messages.map((msg) => (

          <CommunityMessage
            key={msg.id}
            message={msg}
            isMenuOpen={
              openMenuId === msg.id
            }
            onToggleMenu={() =>
              setOpenMenuId((prev) =>
                prev === msg.id
                  ? null
                  : msg.id
              )
            }
            onDelete={() => {
              handleDelete(msg.id);

              setOpenMenuId(null);
            }}
          />

        ))}

        <div ref={bottomRef} />

      </div>

      {/* INPUT */}

      <CommunityInput
        message={message}
        setMessage={setMessage}
        onSubmit={handleSubmit}
        isPending={isPending}
      />

    </div>

  );

}