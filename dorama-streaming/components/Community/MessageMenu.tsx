// components/community/MessageMenu.tsx

"use client";

import {
  MoreVertical,
  Copy,
  Forward,
  Trash2,
} from "lucide-react";

interface Props {
  isOpen: boolean;

  onToggle: () => void;

  onCopy: () => void;

  onDelete?: () => void;

  isAdmin?: boolean;
}

export default function MessageMenu({
  isOpen,
  onToggle,
  onCopy,
  onDelete,
  isAdmin,
}: Props) {

  return (

    <div className="relative shrink-0">

      <button
        onClick={onToggle}
        className="
          opacity-0
          group-hover:opacity-100
          transition
          p-2
          rounded-xl
          hover:bg-white/5
          text-zinc-400
          hover:text-white
        "
      >
        <MoreVertical className="w-4 h-4" />
      </button>

      {isOpen && (

        <div
          className="
            absolute
            top-12
            right-0
            z-999
            w-52
            rounded-2xl
            border
            border-white/10
            bg-[#18181F]
            backdrop-blur-xl
            shadow-2xl
            overflow-hidden
          "
        >

          <button
            onClick={onCopy}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-zinc-300
              hover:bg-white/5
              transition
            "
          >
            <Copy className="w-4 h-4" />
            Copiar mensagem
          </button>

          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              text-sm
              text-zinc-300
              hover:bg-white/5
              transition
            "
          >
            <Forward className="w-4 h-4" />
            Encaminhar
          </button>

          {isAdmin && onDelete && (

            <button
              onClick={onDelete}
              className="
                w-full
                flex
                items-center
                gap-3
                px-4
                py-3
                text-sm
                text-red-400
                hover:bg-red-500/10
                transition
                border-t
                border-white/5
              "
            >
              <Trash2 className="w-4 h-4" />
              Apagar mensagem
            </button>

          )}

        </div>

      )}

    </div>

  );

}