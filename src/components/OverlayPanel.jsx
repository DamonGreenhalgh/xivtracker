// Components
import Banner from "./Banner";
import FailToLoad from "./FailToLoad";
import Stats from "./Stats";
import Equipment from "./Equipment";

// Style
import "../styles/OverlayPanel.css";
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

  return (
    <div
      className={"overlay-panel overlay-panel--" + (displayPanel ? "" : "hide")}
    >
      {referenceCharacter !== null ? (
        <>
          <Banner character={referenceCharacter.Character} />
          <Equipment data={referenceCharacter} display={true} />
          <Stats
            data={referenceCharacter}
            referenceCharacter={data}
            display={true}
            compare={true}
          />
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
                compare={true}
              />
            ))}
          </div>
        </>
      ) : (
        <FailToLoad type="referenceCharacterError" />
      )}
    </div>
  );
};

export default OverlayPanel;
