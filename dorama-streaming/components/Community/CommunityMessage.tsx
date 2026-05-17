// components/community/CommunityMessage.tsx

"use client";

import { memo } from "react";

import { Shield } from "lucide-react";

import MessageMenu from "./MessageMenu";

import { CommunityMessageType } from "./types";

interface Props {
  message: CommunityMessageType;

  isMenuOpen: boolean;

  onToggleMenu: () => void;

  onDelete: () => void;
}

function CommunityMessage({
  message,
  isMenuOpen,
  onToggleMenu,
  onDelete,
}: Props) {

  const isAdmin =
    message.user.role === "ADMIN";

  return (

    <div
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
          w-13
          h-13
          rounded-2xl
          flex
          items-center
          justify-center
          font-black
          text-lg
          shrink-0
          bg-linear-to-br
          from-purple-500
          to-fuchsia-500
        "
      >

        {message.user.name
          ?.charAt(0)
          ?.toUpperCase() || "U"}

      </div>

      {/* BOX */}

      <div className="flex-1 min-w-0">

        <div
          className="
            relative
            rounded-[28px]
            px-6
            py-5
            bg-[#15151D]
            border
            border-white/5
          "
        >

          <div className="flex justify-between gap-4">

            <div className="flex-1 min-w-0">

              <div className="flex items-center gap-3 mb-3 flex-wrap">

                <h3 className="font-black text-sm">
                  {message.user.name}
                </h3>

                {isAdmin && (

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      px-2
                      py-1
                      rounded-full
                      text-[10px]
                      font-black
                      bg-red-500/20
                      text-red-300
                    "
                  >
                    <Shield className="w-3 h-3" />
                    ADMIN
                  </span>

                )}

              </div>

              {message.deleted ? (

                <div
                  className="
                    italic
                    text-zinc-500
                    text-sm
                  "
                >
                  Mensagem removida
                </div>

              ) : (

                <p
                  className="
                    whitespace-pre-wrap
                    break-words
                    text-zinc-300
                    leading-7
                  "
                >
                  {message.content}
                </p>

              )}

            </div>

            {!message.deleted && (

              <MessageMenu
                isOpen={isMenuOpen}
                onToggle={onToggleMenu}
                onCopy={() => {
                  navigator.clipboard.writeText(
                    message.content
                  );
                }}
                onDelete={onDelete}
                isAdmin={isAdmin}
              />

            )}

          </div>

        </div>

      </div>

    </div>

  );

}

export default memo(CommunityMessage);