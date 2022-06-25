import { useState, React } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "./Header.css";

const Header = () => {
  const [active, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!active);
  };
  return (
    <nav className="navbar">
      <img
        src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c8/Bluestar_%28bus_company%29_logo.svg/1280px-Bluestar_%28bus_company%29_logo.svg.png"
        alt="Company Logo"
      />
      <div
        className={active ? "menu-toggle is-active" : "menu-toggle"}
        onClick={ToggleClass}
        id="mobile-menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <ul className={active ? "mobile-nav" : "nav"}>
        <li className="nav-item icon">
          <a href="/">Home</a>
        </li>
        <li className="nav-item icon">
          <a href="/about">About</a>
        </li>
        <li className="nav-item icon">
          <a href="/login">Login</a>
          <LoginIcon
            sx={{ color: "#D47AE8", "&:hover": { color: "#FFF56D" } }}
          />
        </li>
      </ul>
    </nav>
  );
};

export default Header;
