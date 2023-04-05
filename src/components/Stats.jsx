import "../styles/Stats.css";
import Bar from "./Bar";

const Stats = (props) => {
  const { referenceCharacter, data, display, compare } = props;
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
        .map((attribute, index) => {
          const diff =
            referenceCharacter !== null
              ? attribute.Value -
                referenceCharacter.Character.GearSet.Attributes[index].Value
              : 0;
          return (
            <li
              className="row gap-sm align-center"
              key={attribute.Attribute.ID}
              style={{
                gridArea: attribute.Attribute.Name.replace(/\s/g, ""),
              }}
            >
              <p style={{ marginRight: "auto" }}>{attribute.Attribute.Name}</p>
              {diff !== 0 && compare ? (
                <h5
                  style={{
                    color:
                      diff < 0
                        ? "var(--color-error)"
                        : "var(--color-completed)",
                  }}
                >
                  {" ( " + (diff > 0 ? "+" : "") + diff + " )"}
                </h5>
              ) : null}
              <h4>{attribute.Value}</h4>
            </li>
          );
        })}
    </ul>
  );
};

export default Stats;
