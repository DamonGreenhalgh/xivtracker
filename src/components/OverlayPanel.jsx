import "../styles/OverlayPanel.css";
import Banner from "./Banner";
import FailToLoad from "./FailToLoad";
import { IoStatsChart } from "react-icons/io5";
import { GiBattleGear } from "react-icons/gi";
import { MdWork, MdCompareArrows, MdPets } from "react-icons/md";
import { useState } from "react";
import Stats from "./Stats";
import Equipment from "./Equipment";
import { AiFillProfile } from "react-icons/ai";
import Information from "./Information";

import tankIcon from "../images/tank.png";
import healerIcon from "../images/healer.png";
import meleeIcon from "../images/melee.png";
import rangedIcon from "../images/ranged.png";
import magicIcon from "../images/magic.png";
import handIcon from "../images/hand.png";
import landIcon from "../images/land.png";
import JobItem from "../components/JobItem";
import JobHeader from "../components/JobHeader";
import Divider from "./Divider";

const OverlayPanel = (props) => {
  const { data, referenceCharacter, displayPanel } = props;
  const [tabIndex, setTabIndex] = useState(0);
  const [compare, setCompare] = useState(true);

  return (
    <div
      className={"overlay-panel overlay-panel--" + (displayPanel ? "" : "hide")}
    >
      {referenceCharacter !== null ? (
        <>
          <Banner character={referenceCharacter.Character} />
          <Divider />

          {/* <nav className="overlay-panel__tab-container">
            <Button
              content={<GiBattleGear className="character__icon" />}
              condition={tabIndex === 0}
              onClick={() => setTabIndex(0)}
              title="Gear"
            />
            <Button
              content={<IoStatsChart className="character__icon" />}
              condition={tabIndex === 1}
              onClick={() => setTabIndex(1)}
              title="Attributes"
            />
            <Button
              content={<AiFillProfile className="character__icon" />}
              condition={tabIndex === 2}
              onClick={() => setTabIndex(2)}
              title="Information"
            />
            <Button
              content={<MdWork className="character__icon" />}
              condition={tabIndex === 3}
              onClick={() => setTabIndex(3)}
              title="Jobs"
            />
            <Button
              content={<MdPets className="character__icon" />}
              condition={tabIndex === 4}
              onClick={() => setTabIndex(4)}
              title="Jobs"
            />
            <Button
              style={{ marginLeft: "auto" }}
              content={<MdCompareArrows className="character__icon" />}
              condition={compare}
              onClick={() => setCompare(compare ? false : true)}
              title="Compare"
            />
          </nav> */}

          <Equipment data={referenceCharacter} display={true} />
          <Divider />
          <Stats
            data={referenceCharacter}
            referenceCharacter={data}
            display={true}
            compare={compare}
          />
          <Divider />
          {/* <Information data={referenceCharacter} display={true} /> */}
          <div className="jobs__collection jobs__collection--single job--ref ">
            <JobHeader name="Tank" icon={tankIcon} />
            <JobHeader name="Healer" icon={healerIcon} />
            <JobHeader name="Melee" icon={meleeIcon} />
            <JobHeader name="Ranged" icon={rangedIcon} />
            <JobHeader name="Magic" icon={magicIcon} />
            <JobHeader name="Hand" icon={handIcon} />
            <JobHeader name="Land" icon={landIcon} />

            {referenceCharacter.Character.ClassJobs.map((job, index) => (
              <JobItem
                key={referenceCharacter.Character.ClassJobs[index].Job.ID}
                icon={referenceCharacter.Character.ClassJobs[index].Job.Icon}
                name={referenceCharacter.Character.ClassJobs[index].Job.Name}
                level={referenceCharacter.Character.ClassJobs[index].Level}
                exp={[
                  referenceCharacter.Character.ClassJobs[index].ExpLevel,
                  referenceCharacter.Character.ClassJobs[index].ExpLevelMax,
                ]}
                isCombat={true}
                diff={
                  referenceCharacter.Character.ClassJobs[index].Level -
                  data.Character.ClassJobs[index].Level
                }
                compare={compare}
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
