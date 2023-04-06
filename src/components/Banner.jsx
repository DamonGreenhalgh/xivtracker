import { Link } from "react-router-dom";

// Assets / Style
import "../styles/Banner.css";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";
import { ImDiamonds } from "react-icons/im";

const Banner = (props) => {
  const {
    type,
    name,
    title,
    avatar,
    link,
    misc,
    content,
    gender,
    race,
    tribe,
  } = props;
  return (
    <Link className={"banner " + type} to={link}>
      {avatar}
      <div className="col justify-between gap-sm">
        <h2>{name}</h2>
        <h3>{title}</h3>
        {gender !== undefined ? (
          <div className="row gap-sm align-center">
            <p>{tribe + " " + race}</p>
          </div>
        ) : null}
        {content !== undefined ? <p>{content}</p> : null}
      </div>
      <div
        className="col justify-between align-end"
        style={{ marginLeft: "auto" }}
      >
        <div
          className="row gap-sm align-center"
          style={{ color: "var(--color-completed)" }}
        >
          <p>{misc}</p>
          <ImDiamonds style={{ minHeight: "1rem", minWidth: "1rem" }} />
        </div>
        <img
          src={gender === 1 ? maleIcon : femaleIcon}
          style={{ maxHeight: "1rem" }}
          alt="gender"
        />
      </div>
    </Link>
  );
};

Banner.defaultProps = {
  link: "",
  type: "disabled",
};

export default Banner;
