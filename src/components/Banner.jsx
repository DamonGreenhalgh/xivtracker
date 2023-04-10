import { Link } from "react-router-dom";

// Assets / Style
import "../styles/Banner.css";
import maleIcon from "../images/male.png";
import femaleIcon from "../images/female.png";
import { ImDiamonds } from "react-icons/im";
import { useEffect, useState } from "react";

const Banner = (props) => {
  const { character } = props;
  const [level, setLevel] = useState(0);

  useEffect(() => {
    const gearList = Object.values(character.GearSet.Gear);
    // remove soul crystal from gear list if they have one
    if (
      gearList[gearList.length - 1].Item.ItemUICategory.Name === "Soul Crystal"
    ) {
      gearList.pop();
    }
    let averageILVL = 0;
    for (const gear of gearList) {
      averageILVL += gear.Item.LevelItem;
    }
    setLevel(Math.round(averageILVL / gearList.length));
  }, []);
  return (
    <Link className="banner" to={"/" + character.ID}>
      <div className="banner__avatar-container">
        <img src={character.Avatar} className="banner__avatar" />
        <h4 className="banner__level">{"i" + level}</h4>
      </div>
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
