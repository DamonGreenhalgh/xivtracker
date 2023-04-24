import brandIconDark from "../images/brand-dark.png";
import brandIconLight from "../images/brand-light.png";
import "../styles/Navbar.css";
import { Link, useLocation } from "react-router-dom";
import { RiSettings3Line } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Searchbar from "./Searchbar";

const Navbar = (props) => {
  const { referenceCharacter, theme } = props;
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" title="Home">
        <img
          src={theme === "light" ? brandIconLight : brandIconDark}
          className="navbar__brand-icon"
          alt="xiv tracker"
        />
      </Link>
      {location.pathname !== "/" ? (
        <Searchbar
          searchCharacter={(name, server) =>
            (window.location.href = "./?name=" + name + "&server=" + server)
          }
          type="character"
        />
      ) : null}

      <Link to="/help" title="Help" style={{ marginLeft: "auto" }}>
        <button>
          <BiHelpCircle className="navbar__icon" />
        </button>
      </Link>
      <Link to="/settings" title="Settings">
        <button>
          <RiSettings3Line className="navbar__icon" />
        </button>
      </Link>
      {referenceCharacter !== null ? (
        <Link to={"/" + referenceCharacter.Character.ID}>
          <img
            src={referenceCharacter.Character.Avatar}
            className="overlay-panel__avatar"
            title={referenceCharacter.Character.Name}
            alt="reference character"
          />
        </Link>
      ) : (
        <CgProfile className="navbar__icon" />
      )}
    </nav>
  );
};

export default Navbar;
