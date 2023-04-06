import "../styles/OverlayPanel.css";
import Banner from "./Banner";
import FailToLoad from "./FailToLoad";
import { IoStatsChart } from "react-icons/io5";
import { GiBattleGear } from "react-icons/gi";
import { MdWork, MdCompareArrows } from "react-icons/md";
import { useState } from "react";
import Stats from "./Stats";
import Button from "./Button";
import Equipment from "./Equipment";
import { AiFillProfile } from "react-icons/ai";
import Information from "./Information";

const iconSize = "1em";
const OverlayPanel = (props) => {
  const { data, referenceCharacter, displayPanel } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [compare, setCompare] = useState(false);

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
              content={<AiFillProfile size={iconSize} />}
              condition={tabIndex === 2}
              onClick={() => setTabIndex(2)}
              title="Information"
            />
            <Button
              content={<MdWork size={iconSize} />}
              condition={tabIndex === 3}
              onClick={() => setTabIndex(3)}
              title="Jobs"
            />
            <Button
              style={{ marginLeft: "auto" }}
              content={<MdCompareArrows size={iconSize} />}
              condition={compare}
              onClick={() => setCompare(compare ? false : true)}
              title="Compare"
            />
          </nav>
          <Equipment data={referenceCharacter} display={tabIndex === 0} />
          <Stats
            data={referenceCharacter}
            referenceCharacter={data}
            display={tabIndex === 1}
            compare={compare}
          />
          <Information data={referenceCharacter} display={tabIndex === 2} />
        </>
      ) : (
        <FailToLoad type={"referenceError"} />
      )}
    </div>
  );
};

export default OverlayPanel;
