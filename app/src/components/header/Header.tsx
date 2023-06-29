import { FaHome, FaUser } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { NavItem } from "./NavItem";

export function Header() {
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
    </header>
  );
}
