export default function Sidebar() {
  return (
    <nav className="flex flex-col bg-background-dark">
      <a href="/play" className="sidebar-button">
        Home
      </a>
      <a href="/play/team" className="sidebar-button">
        Team
      </a>
      <a href="/play/profile" className="sidebar-button">
        Profile
      </a>
      <a href="/play/danger" className="sidebar-button">
        Danger Zone
      </a>
    </nav>
  );
}
