type Props = {
  children: React.ReactNode;
};

export function MainContainer({
  children,
}: Props) {
  return (
    <main
      className="
        mx-auto
        w-full
        max-w-[1600px]
        px-4
        md:px-6
        lg:px-8
      "
    >
      {children}
    </main>
  );
}