export default function Sidebar() {
  return (
    <aside className="w-1/4 overflow-y-auto bg-background-dark flex flex-col">
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
    </aside>
  );
}
