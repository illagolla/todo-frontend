import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-center">
        <Link to="/">
          <h1 className="text-4xl font-semibold text-[#2CB1BC]">
            Todo Application
          </h1>
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/addtask" className=" bg-[#49bc2c] rounded text-center">
              Add Task
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
