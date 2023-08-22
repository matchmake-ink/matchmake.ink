export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background-dark border-text border-b h-20 sticky top-0 w-full">
      <h1 className="font-stylized opacity-0 w-0 lg:opacity-100 lg:w-full">
        matchmake.ink
      </h1>
      <nav className="w-full flex lg:justify-center">
        <a className="nav-item" href="/play">
          Play
        </a>
        <a className="nav-item" href="/tournaments">
          Tournaments
        </a>
        <a className="nav-item" href="/leaderboard">
          Leaderboard
        </a>
        <a className="nav-item" href="/settings">
          Settings
        </a>
      </nav>
    </header>
  );
}
