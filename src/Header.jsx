import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>React Demo</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Landing page</NavLink>
            <NavLink to="/persons">Persons</NavLink>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
