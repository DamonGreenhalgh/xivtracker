import { useState, useEffect } from "react";
import Divider from "./Divider";
import itemFrame from "../images/item-frame.png";
import glamourIcon from "../images/glamour.png";
import "../styles/Item.css";

const mainStatReference = [
  "DamagePhys",
  "DamageMag",
  "DefensePhys",
  "DefenseMag",
  "Block",
  "BlockRate",
  "DelayMs",
];
const statName = [
  "Physical Damage",
  "Magic Damage",
  "Defense",
  "Magic Defense",
  "Block Strength",
  "Block Rate",
  "Delay",
];

const materiaData = {
  "Heavens' Eye Materia": {
    attribute: "DHR",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Savage Aim Materia": {
    attribute: "CH",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Savage Might Materia": {
    attribute: "DET",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Quickarm Materia": {
    attribute: "SKS",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Quicktongue Materia": {
    attribute: "SPS",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Battledance Materia": {
    attribute: "TEN",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Piety Materia": {
    attribute: "PIE",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 16,
      VII: 8,
      VIII: 24,
      IX: 12,
      X: 36,
    },
  },
  "Gather's Grasp Materia": {
    attribute: "GP",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 8,
      VII: 7,
      VIII: 9,
      IX: 8,
      X: 10,
    },
  },
  "Gatherer's Guile Materia": {
    attribute: "PER",
    value: {
      I: 3,
      II: 4,
      III: 5,
      IV: 6,
      V: 10,
      VI: 15,
      VII: 12,
      VIII: 20,
      IX: 14,
      X: 25,
    },
  },
  "Gatherer's Guerdon Materia": {
    attribute: "GAT",
    value: {
      I: 3,
      II: 4,
      III: 5,
      IV: 6,
      V: 10,
      VI: 15,
      VII: 12,
      VIII: 20,
      IX: 14,
      X: 25,
    },
  },
  "Craftsman's Cunning Materia": {
    attribute: "CP",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 6,
      VI: 8,
      VII: 7,
      VIII: 9,
      IX: 8,
      X: 10,
    },
  },
  "Craftsman's Command Materia": {
    attribute: "CON",
    value: {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 7,
      VI: 10,
      VII: 9,
      VIII: 13,
      IX: 12,
      X: 18,
    },
  },
  "Craftsman's Competence Materia": {
    attribute: "CS",
    value: {
      I: 3,
      II: 4,
      III: 5,
      IV: 6,
      V: 11,
      VI: 16,
      VII: 14,
      VIII: 21,
      IX: 18,
      X: 27,
    },
  },
};

const Item = (props) => {
  const [isGlamour, setIsGlamour] = useState(false);
  const [itemLevel, setItemLevel] = useState(null);
  const [stats, setStats] = useState(null);
  const [glamour, setGlamour] = useState(null);
  const [materia, setMateria] = useState(null);

  // On mount, determine if glamour or materia content is available,
  // if it is, add to tooltip.
  useEffect(() => {
    if (props.glamour !== null && props.glamour !== undefined) {
      setIsGlamour(true);
      setGlamour(
        <>
          <h5>Glamour</h5>
          <div className="row align-center gap">
            <img
              src={"https://xivapi.com" + props.glamour.Icon}
              className="tooltip__icon"
              alt=""
            />
            <img src={itemFrame} className="tooltip__icon absolute" alt="" />
            <p>{props.glamour.Name}</p>
          </div>
        </>
      );
    }
    if (props.materia !== undefined && props.materia.length > 0) {
      setMateria(
        <>
          <h5>Materia</h5>
          {props.materia.map((mat, index) => {
            const splitIndex = mat.Name.lastIndexOf(" ");
            const name = mat.Name.substring(0, splitIndex);
            const grade = mat.Name.substring(splitIndex + 1);
            return (
              <div className="row align-center gap" key={index}>
                <img
                  src={"https://xivapi.com" + mat.Icon}
                  className="tooltip__icon"
                  alt=""
                />
                <img
                  src={itemFrame}
                  className="tooltip__icon absolute"
                  alt=""
                />
                <p>{mat.Name}</p>
                <h5
                  style={{
                    color: "var(--c-green)",
                    marginLeft: "auto",
                  }}
                >
                  {"( + " +
                    materiaData[name].value[grade] +
                    " " +
                    materiaData[name].attribute +
                    " )"}
                </h5>
              </div>
            );
          })}
        </>
      );
    }

    // Fetch attribute data if the item is an equipment piece.
    if (props.id !== undefined) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    /*
        This function fetches the data for a particular equipment item. 
        Updates the item level, main stats, and bonus stats of the tooltip.
        */

    // Fetch data
    let itemData;
    await fetch("https://xivapi.com/item/" + props.id, { mode: "cors" })
      .then((response) => response.json())
      .then((data) => (itemData = data));

    // Update state with data
    setItemLevel("Level " + itemData.LevelItem);
    if (props.type !== "SoulCrystal") {
      // Soul Crystals do not have any stats.
      setStats(
        <>
          <Divider />
          {
            <div className="row gap justify-end">
              {mainStatReference.map((stat, index) =>
                itemData[stat] !== 0 ? (
                  <div className="col gap" key={index}>
                    <p>{statName[index]}</p>
                    <h5 className="text-end">{itemData[stat]}</h5>
                  </div>
                ) : null
              )}
            </div>
          }
          <h5>Bonuses</h5>
          <div className="tooltip__stats">
            {itemData.Stats !== undefined
              ? Object.keys(itemData.Stats).map((stat) => (
                  <div
                    className="row justify-between gap"
                    key={itemData.Stats[stat].ID}
                  >
                    <p>{stat}</p>
                    <h5>{itemData.Stats[stat].NQ}</h5>
                  </div>
                ))
              : null}
          </div>
        </>
      );
    }
  };

  return (
    <div className="item interactable" style={{ gridArea: props.type }}>
      <img
        src={glamourIcon}
        className={isGlamour ? "glamour-icon absolute" : "disabled"}
        alt="Glamour Indicator"
      />
      <img src={props.icon} className="item__icon absolute" alt={props.name} />
      <img src={itemFrame} className="item__icon absolute" alt="" />

      <div className="tooltip">
        <div className="tooltip__header">
          <div style={{ gridArea: "icon" }}>
            <img
              src={props.icon}
              className="item__icon absolute"
              alt={props.name}
            />
            <img src={itemFrame} className="item__icon absolute" alt="" />
          </div>
          <h4 style={{ gridArea: "name", color: "var(--c-major-text)" }}>
            {props.name}
          </h4>
          <p style={{ gridArea: "type" }}>{props.type}</p>
          <p style={{ gridArea: "type" }}>{props.collectionType}</p>
          <p style={{ gridArea: "level", textAlign: "end" }}>{itemLevel}</p>
        </div>
        {stats}
        {materia}
        {glamour}
      </div>
    </div>
  );
};

export default Item;
