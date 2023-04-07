import { Link } from "react-router-dom";

// Assets / Style
import "../styles/Banner.css";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";
import { ImDiamonds } from "react-icons/im";

const Banner = (props) => {
  const { character } = props;
  return (
    <Link className="banner" to={"/" + character.ID}>
      <img src={character.Avatar} className="banner__avatar" />
      <div className="banner__main-content">
        <h2>{character.Name}</h2>
        <h3>{character.Title.Name}</h3>
        <div className="row gap-sm align-center" style={{ marginTop: "auto" }}>
          <p>{character.Tribe.Name + " " + character.Race.Name}</p>
          <img
            src={character.Gender === 1 ? maleIcon : femaleIcon}
            style={{ maxHeight: "1rem" }}
            alt="gender"
          />
        </div>
      </div>
      <div className="banner__server">
        <p>{character.Server}</p>
        <ImDiamonds style={{ minHeight: "1rem", minWidth: "1rem" }} />
      </div>
    </Link>
  );
};

export default Banner;
