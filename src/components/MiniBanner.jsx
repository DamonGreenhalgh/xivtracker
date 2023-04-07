import { Link } from "react-router-dom";

// Assets / Style
import "../styles/Banner.css";
import { ImDiamonds } from "react-icons/im";

const MiniBanner = (props) => {
  const { character } = props;
  return (
    <Link className="banner banner--mini" to={"/" + character.ID}>
      <img
        src={character.Avatar}
        className="banner__avatar banner__avatar--mini"
      />
      <div className="banner__main-content">
        <p>
          <b>{character.Name}</b>
        </p>
        <div className="banner__server">
          <p style={{ fontSize: ".6rem" }}>{character.Server}</p>
          <ImDiamonds style={{ maxHeight: ".6rem", minWidth: "1rem" }} />
        </div>
      </div>
      <p>{character.Lang}</p>
    </Link>
  );
};

export default MiniBanner;
