export default function Header() {
  return (
    <header className="flex items-center justify-between w-screen py-12 px-6 sm:py-8 sm:px-20 shadow-md bg-white">
      <h1 className="text-2xl font-bold">
        <a href="/">Where in the world?</a>
      </h1>
      <div className="flex items-center gap-2">
        <button>
          <img src="/src/assets/dark-mode.svg" alt="toggle dark mode" />
        </button>
        <span>Dark Mode</span>
      </div>
    </header>
  );
}
