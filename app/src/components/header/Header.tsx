import { FaHome, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { useSession } from "../../backend/session";
import { NavItem } from "./NavItem";
import { backendClient } from "../../backend/client";
import { useNavigate } from "react-router-dom";

export function Header() {
  const session = useSession();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-4 py-2 bg-background-dark border-white border-b h-20">
      <h1 className="text-bold text-2xl m-2 text-accent-400 font-splatoon">
        matchmake.ink
      </h1>
      <nav
        role="navigation"
        className="flex items-center justify-between flex-1"
      >
        <NavItem link="/" icon={<FaHome />} />
        <NavItem link="/team" icon={<MdGroups />} />
        <NavItem link="/profile" icon={<FaUser />} />
        <NavItem link="/settings" icon={<BsGearFill />} />
      </nav>
      <span className="w-full"></span>
      <button
        onClick={() => {
          if (session) {
            backendClient.auth.signOut();
          } else {
            navigate("/login");
          }
        }}
        className="nav-link"
      >
        {session ? <FaSignOutAlt /> : <FaSignInAlt />}
      </button>
    </header>
  );
}
