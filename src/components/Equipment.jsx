import "../styles/Equipment.css";
import Item from "./Item";
import JobItem from "./JobItem";

const equipmentNames = [
  "Body",
  "Bracelets",
  "Earrings",
  "Feet",
  "Hands",
  "Head",
  "Legs",
  "MainHand",
  "Necklace",
  "OffHand",
  "Ring1",
  "Ring2",
  "SoulCrystal",
];
const Equipment = (props) => {
  const { data, display } = props;
  return (
    <div className={"equipment" + (display ? "" : " disabled")}>
      <div
        style={{
          backgroundImage: "url('" + data.Character.Portrait + "')",
        }}
        className="equipment__portrait"
      >
        <JobItem
          name={data.Character.ActiveClassJob.Job.Name}
          level={data.Character.ActiveClassJob.Level}
          exp={[
            data.Character.ActiveClassJob.ExpLevel,
            data.Character.ActiveClassJob.ExpLevelMax,
          ]}
          icon={data.Character.ActiveClassJob.Job.Icon}
          currentJob={true}
          hasLink={true}
        />
      </div>
      {Object.values(data.Character.GearSet.Gear).map((item, index) => (
        <Item
          type={equipmentNames[index]}
          name={item.Item.Name}
          icon={
            ("https://xivapi.com" + item.Item.Icon).slice(0, -4) + "_hr1.png"
          }
          materia={item.Materia}
          glamour={item.Mirage}
          id={item.Item.ID}
          key={index}
        />
      ))}
    </div>
  );
};

export default Equipment;
