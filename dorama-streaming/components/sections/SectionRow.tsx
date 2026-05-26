type SectionRowProps = {
  title: string;

  children: React.ReactNode;

  viewAllHref?: string;
};

export function SectionRow({
  title,
  children,
  viewAllHref,
}: SectionRowProps) {
  return (
    <section className="mt-16">
      {/* Header */}
      <div
        className="
          mb-6
          flex
          items-center
          justify-between
        "
      >
        <h2
          className="
            text-2xl
            font-bold
            text-white
            md:text-3xl
          "
        >
          {title}
        </h2>

        {viewAllHref && (
          <a
            href={viewAllHref}
            className="
              text-sm
              font-medium
              text-zinc-400
              transition-colors
              hover:text-white
            "
          >
            Ver mais →
          </a>
        )}
      </div>

      {/* Content */}
      <div
        className="
          grid
          grid-cols-2
          gap-5
          sm:grid-cols-3
          lg:grid-cols-5
          xl:grid-cols-6
        "
      >
        {children}
      </div>
    </section>
  );
}