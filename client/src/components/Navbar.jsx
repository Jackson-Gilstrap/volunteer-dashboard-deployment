import { Link } from "react-router-dom";
import { NavbarData } from "./SidebarData";
import "../styles/main.css";
const Navbar = () => {
  return (
    <>
      <nav className="side-bar">
        <ul className="nav-menu-items">
          {NavbarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
