import "../styles/OverlayPanel.css";
import JobItem from "./JobItem";
import Item from "./Item";
import Banner from "./Banner";
import FailToLoad from "./FailToLoad";

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
const OverlayPanel = (props) => {
  const { data, displayPanel } = props;
  //   const equipmentNames = Object.keys(data.Character.GearSet.Gear);
  return (
    <div
      className={"overlay-panel overlay-panel--" + (displayPanel ? "" : "hide")}
    >
      {data !== null ? (
        <>
          <Banner
            type=""
            avatar={
              <img
                src={data.Character.Avatar}
                className="rounded"
                alt="character avatar"
              />
            }
            name={data.Character.Name}
            title={data.Character.Title.Name}
            misc={data.Character.Server}
            link={"/" + data.Character.ID}
          />
          <div className="equipment">
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
                  ("https://xivapi.com" + item.Item.Icon).slice(0, -4) +
                  "_hr1.png"
                }
                materia={item.Materia}
                glamour={item.Mirage}
                id={item.Item.ID}
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <FailToLoad type={"referenceError"} />
      )}
    </div>
  );
};

export default OverlayPanel;
