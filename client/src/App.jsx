import ReactDOM from "react-dom/client";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Create Volunteer</Link>
        </li>
        <li>
          <Link to="/volunteertimein">Clock In</Link>
        </li>
        <li>
          <Link to="/volunteertimeout">Clock Out</Link>
        </li>
        <li>
          <Link to="/records">Records</Link>
        </li>
      </ul>
    </nav>
  );
};
const App = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default App;
