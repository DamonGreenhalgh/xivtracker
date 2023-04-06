import brand from "../images/brand.png";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { RiSettings3Line } from "react-icons/ri";
import { BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Searchbar from "./Searchbar";

const Navbar = (props) => {
  const { referenceCharacter, displayPanel, setDisplayPanel } = props;

  return (
    <nav className="navbar">
      <Link to="/" title="Home">
        <img src={brand} className="navbar__brand-icon" alt="xiv tracker" />
      </Link>
      <Searchbar
        search={(name, server) =>
          (window.location.href = "./?name=" + name + "&server=" + server)
        }
        type="character"
      />
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
      <button onClick={() => setDisplayPanel(displayPanel ? false : true)}>
        {referenceCharacter !== null ? (
          <img
            src={referenceCharacter.Character.Avatar}
            className="overlay-panel__avatar"
            title={referenceCharacter.Character.Name}
            alt="reference character"
          />
        ) : (
          <CgProfile className="navbar__icon" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
