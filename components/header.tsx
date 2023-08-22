import { GiTrophy, GiSwordsEmblem, GiPodium } from "react-icons/gi";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background-dark border-text border-b-2 h-20 sticky top-0 w-full">
      <h1 className="font-stylized opacity-100 w-full">matchmake.ink</h1>
      <nav className="flex lg:justify-center">
        <a className="nav-item" href="/play">
          <GiSwordsEmblem className="nav-icon" />
        </a>
        <a className="nav-item" href="/tournaments">
          <GiTrophy className="nav-icon" />
        </a>
        <a className="nav-item" href="/leaderboard">
          <GiPodium className="nav-icon" />
        </a>
      </nav>
    </header>
  );
}
