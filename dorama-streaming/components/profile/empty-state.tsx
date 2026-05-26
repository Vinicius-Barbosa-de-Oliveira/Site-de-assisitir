import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function EmptyState({
  icon,
  title,
  description,
}: EmptyStateProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#12121A]
        px-8
        py-20
        text-center
      "
    >
      <div
        className="
          mx-auto
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-white/5
          text-zinc-500
        "
      >
        {icon}
      </div>

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <p
        className="
          mx-auto
          mt-3
          max-w-md
          text-zinc-500
        "
      >
        {description}
      </p>
    </div>
  );
}