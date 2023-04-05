import "../styles/OverlayPanel.css";
import JobItem from "./JobItem";
import Item from "./Item";
import Banner from "./Banner";
import FailToLoad from "./FailToLoad";
import { IoStatsChart } from "react-icons/io5";
import { GiBattleGear } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { useState } from "react";
import Stats from "./Stats";
import Button from "./Button";

const iconSize = "1em";
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
  const { data, referenceCharacter, displayPanel } = props;
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <div
      className={"overlay-panel overlay-panel--" + (displayPanel ? "" : "hide")}
    >
      {referenceCharacter !== null ? (
        <>
          <Banner
            type=""
            avatar={
              <img
                src={referenceCharacter.Character.Avatar}
                className="rounded"
                alt="character avatar"
              />
            }
            name={referenceCharacter.Character.Name}
            title={referenceCharacter.Character.Title.Name}
            misc={referenceCharacter.Character.Server}
            link={"/" + referenceCharacter.Character.ID}
          />
          <nav className="overlay-panel__tab-container">
            <Button
              content={<GiBattleGear size={iconSize} />}
              condition={tabIndex === 0}
              onClick={() => setTabIndex(0)}
              title="Gear"
            />
            <Button
              content={<IoStatsChart size={iconSize} />}
              condition={tabIndex === 1}
              onClick={() => setTabIndex(1)}
              title="Attributes"
            />
            <Button
              content={<MdWork size={iconSize} />}
              condition={tabIndex === 2}
              onClick={() => setTabIndex(2)}
              title="Jobs"
            />
          </nav>
          <div
            className={"equipment" + (tabIndex === 0 ? "" : " disabled")}
            onClick={() => setTabIndex(3)}
          >
            <div
              style={{
                backgroundImage:
                  "url('" + referenceCharacter.Character.Portrait + "')",
              }}
              className="equipment__portrait"
            >
              <JobItem
                name={referenceCharacter.Character.ActiveClassJob.Job.Name}
                level={referenceCharacter.Character.ActiveClassJob.Level}
                exp={[
                  referenceCharacter.Character.ActiveClassJob.ExpLevel,
                  referenceCharacter.Character.ActiveClassJob.ExpLevelMax,
                ]}
                icon={referenceCharacter.Character.ActiveClassJob.Job.Icon}
                currentJob={true}
                hasLink={true}
              />
            </div>
            {Object.values(referenceCharacter.Character.GearSet.Gear).map(
              (item, index) => (
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
              )
            )}
          </div>
          <Stats
            data={referenceCharacter}
            referenceCharacter={data}
            display={tabIndex === 1}
          />
        </>
      ) : (
        <FailToLoad type={"referenceError"} />
      )}
    </div>
  );
};

export default OverlayPanel;
