export function BackgroundEffects() {
  return (
    <div
      className="
        fixed
        inset-0
        -z-10
        overflow-hidden
      "
    >
      <div
        className="
          absolute
          top-0
          left-1/3
          h-125
          w-125
          rounded-full
          bg-purple-700/20
          blur-3xl
        "
      />

      <div
        className="
          absolute
          bottom-0
          right-1/3
          h-[400px]
          w-[400px]
          rounded-full
          bg-pink-700/20
          blur-3xl
        "
      />
    </div>
  );
}