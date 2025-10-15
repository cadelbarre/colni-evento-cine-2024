// bg-[url("../assets/cine-evento-2025.webp")
export default function LeftSide(): JSX.Element {
  return (
    <div
      className="relative flex-1 hidden items-center justify-center h-screen lg:flex"
      style={{
        background:
          "linear-gradient(360deg,rgba(51, 51, 51, 1) 0%, rgba(0, 0, 0, 1) 100%)",
      }}
    >
      <img
        aria-label="flyer de desafio neurovascular"
        className="size-full object-contain"
        src="/cine-evento-2025.webp"
        style={{
          background:
            "linear-gradient(360deg,rgba(51, 51, 51, 1) 0%, rgba(0, 0, 0, 1) 100%)",
        }}
      />
    </div>
  );
}
