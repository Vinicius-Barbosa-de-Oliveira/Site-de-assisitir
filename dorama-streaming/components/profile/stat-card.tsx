import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-[#12121A]
        p-7
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-purple-500/30
        hover:shadow-[0_0_40px_rgba(168,85,247,0.12)]
      "
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-2xl
            bg-purple-500/15
            text-purple-400
          "
        >
          {icon}
        </div>
      </div>

      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <h3 className="mt-2 text-4xl font-black">
        {value}
      </h3>
    </div>
  );
}