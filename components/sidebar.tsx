import { BsFillGearFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="w-64 overflow-y-auto bg-background-dark flex flex-col">
      <a href="/play" className="sidebar-button">
        Challenge
      </a>
      <a href="/play/matches" className="sidebar-button">
        Matches
      </a>
      <a href="/play/team" className="sidebar-button">
        Team
      </a>
      <span className="h-full" />
      <div className="flex flex-row">
        <a href="/play/profile" className="m-auto my-6 text-4xl text-text">
          <FaUserAlt className="sidebar-icon" />
        </a>
        <a href="/play/settings" className="m-auto my-6 text-4xl text-text">
          <BsFillGearFill className="sidebar-icon" />
        </a>
      </div>
    </aside>
  );
}
