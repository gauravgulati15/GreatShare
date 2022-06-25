import { useState, React } from "react";
import LoginIcon from "@mui/icons-material/Login";
import "../CSS/Header.css";
import logo from "../Images/logo.png";
import { useUserContext } from "../context/user_context";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Header = () => {
  const { user, authenticated } = useUserContext();
  const [active, setActive] = useState(false);
  const ToggleClass = () => {
    setActive(!active);
  };
  return (
    <nav className="navbar">
      <img src={logo} alt="Company Logo" />
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
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item icon">
          <Link to="/about">About</Link>
        </li>
        {authenticated ? (
          <li className="nav-item icon">
            <Link className="Link" to={`/${user}`}>
              <AccountCircleIcon />
              {user}
            </Link>
          </li>
        ) : (
          <li className="nav-item icon">
            <Link className="Link " to="/login">
              Login
            </Link>
            <LoginIcon
              sx={{ color: "#D47AE8", "&:hover": { color: "#FFF56D" } }}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;
