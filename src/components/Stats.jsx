import "../styles/Stats.css";
import Bar from "./Bar";

const Stats = (props) => {
  const { data, display } = props;
  return (
    <ul className={"attributes__list" + (display ? "" : " disabled")}>
      <div className="attributes__main">
        <p>{data.Character.GearSet.Attributes.at(-2).Attribute.Name}</p>
        <h4>{data.Character.GearSet.Attributes.at(-2).Value}</h4>
        <Bar color="#5d9c22" width="100%" />
      </div>
      <div className="attributes__main">
        <p>{data.Character.GearSet.Attributes.at(-1).Attribute.Name}</p>
        <h4>{data.Character.GearSet.Attributes.at(-1).Value}</h4>
        <Bar color="#be2c9f" width="100%" />
      </div>
      <div className="divider" style={{ gridArea: "divider1" }} />
      <div className="divider" style={{ gridArea: "divider2" }} />
      <div className="divider" style={{ gridArea: "divider3" }} />
      {Object.values(data.Character.GearSet.Attributes)
        .slice(0, -2)
        .map((attribute) => {
          return (
            <li
              className="row gap-sm align-center"
              key={attribute.Attribute.ID}
              style={{
                gridArea: attribute.Attribute.Name.replace(/\s/g, ""),
              }}
            >
              <p style={{ marginRight: "auto" }}>{attribute.Attribute.Name}</p>
              <h4>{attribute.Value}</h4>
            </li>
          );
        })}
    </ul>
  );
};

export default Stats;
