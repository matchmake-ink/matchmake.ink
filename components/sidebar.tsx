export default function Sidebar() {
  return (
    <nav className="flex flex-col bg-background-dark">
      <a href="/play" className="sidebar-button">
        Home
      </a>
      <a href="/team" className="sidebar-button">
        Team
      </a>
      <a href="/profile" className="sidebar-button">
        Profile
      </a>
      <a href="/danger" className="sidebar-button">
        Danger Zone
      </a>
    </nav>
  );
}
