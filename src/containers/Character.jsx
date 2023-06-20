// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

// Components
import Jobs from "./Jobs";
import Collection from "./Collection";
import Quests from "./Quests";
import Achievements from "./Achievements";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import Button from "../components/Button";
import OverlayPanel from "../components/OverlayPanel";
import Stats from "../components/Stats";
import Equipment from "../components/Equipment";
import Information from "../components/Information";
import Friends from "../components/Friends";
import FreeCompany from "./FreeCompany";
import Featured from "../components/Featured";

// Style
import { MdWork, MdPets } from "react-icons/md";
import { FaScroll, FaMedal, FaUserFriends, FaFlag } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import "../styles/Character.css";

/**
 * @name Character
 * @description This component represents the character profile page.
 * @param {*} props
 * @returns
 */
const Character = (props) => {
  const {
    referenceCharacter,
    setReferenceCharacter,
    displayPanel,
    setDisplayPanel,
  } = props;
  const { id } = useParams();
  const { data, loading, ok } = useFetchData(
    "https://xivapi.com/character/" + id + "?extended=1&data=AC,FC,MIMO,FR,FCM"
  );
  const [index, setIndex] = useState(0);
  const [characterTabIndex, setCharacterTabIndex] = useState(0);
  const [socialTabToggle, setSocialTabToggle] = useState(true);
  const [jobsTabToggle, setJobsTabToggle] = useState(true);
  const [achievementTabToggle, setAchievementTabToggle] = useState(true);

  useEffect(() => {
    /**
     * @name storeRecent
     * @description This function stores recently viewed characters into local
     * storage to be viewed later.
     * @param {*} data A JSON object from XIVAPI
     */
    const storeRecent = (data) => {
      // Define new character object.
      const character = {
        Name: data.Name,
        Avatar: data.Avatar,
        ID: data.ID,
        Server: data.Server,
      };

      // Retrieve 'recent' variable from local storage.
      let recent = JSON.parse(localStorage.getItem("recent"));

      // First time user, create recent array.
      if (recent === null) {
        recent = [];
      }

      // Check if the character is in the recent array, if it is, remove it.
      for (let i = 0; i < recent.length; i++) {
        if (recent[i].ID === character.ID) {
          recent.splice(i, 1);
        }
      }

      // Add character to the front of the array. Indicates most recently
      // viewed character.
      recent.unshift(character);

      // If recent array is at max capacity, remove the last element.
      if (recent.length > 6) {
        recent.pop();
      }

      // Store 'recent' back into local storage.
      localStorage.setItem("recent", JSON.stringify(recent));
    };

    if (!loading) {
      document.title = "XIV Tracker | " + data.Character.Name;
      storeRecent(data.Character);
    }
  }, [loading]);

  return loading ? (
    <Loading full={true} />
  ) : (
    <div className="character">
      <OverlayPanel
        data={data}
        referenceCharacter={referenceCharacter}
        displayPanel={displayPanel}
      />
      <button
        title="Show Reference Character"
        className={
          "overlay-panel__toggle" +
          (displayPanel ? "" : " overlay-panel__toggle--hide")
        }
        onClick={() => {
          setDisplayPanel(displayPanel ? false : true);
        }}
      >
        {displayPanel ? (
          <FiChevronsRight className="character__icon" />
        ) : (
          <FiChevronsLeft className="character__icon" />
        )}
      </button>
      <button
        onClick={() => setReferenceCharacter(data)}
        className="character__set-reference-btn"
        style={{
          backgroundColor:
            referenceCharacter === null
              ? "var(--c-purple)"
              : referenceCharacter.Character.ID === data.Character.ID
              ? "var(--c-green)"
              : "var(--c-purple)",
        }}
      >
        <CgProfile className="character__icon" />
        {referenceCharacter === null
          ? "Reference " + data.Character.Name
          : referenceCharacter.Character.ID === data.Character.ID
          ? data.Character.Name + " is the current reference character"
          : "Reference " + data.Character.Name}
      </button>
      <Banner character={data.Character} />
      <div className="character__content">
        <div className="character__side">
          <Featured />
          <nav className="character__tab" style={{ marginTop: "2rem" }}>
            <Button
              icon={<GiBattleGear className="character__icon" />}
              condition={characterTabIndex === 0}
              onClick={() => setCharacterTabIndex(0)}
              title="Show current gear"
              text="Gear"
              className="character__tab-btn"
              type="tab"
            />
            <Button
              icon={<IoStatsChart className="character__icon" />}
              condition={characterTabIndex === 1}
              onClick={() => setCharacterTabIndex(1)}
              title="Show attributes"
              text="Attributes"
              className="character__tab-btn"
              type="tab"
            />
            <Button
              icon={<AiFillProfile className="character__icon" />}
              condition={characterTabIndex === 2}
              onClick={() => setCharacterTabIndex(2)}
              title="Set information"
              text="Information"
              className="character__tab-btn"
              type="tab"
            />
          </nav>
          <div className="section" style={{ zIndex: "3" }}>
            <Equipment data={data} display={characterTabIndex === 0} />
            <Stats
              data={data}
              referenceCharacter={referenceCharacter}
              display={characterTabIndex === 1}
              compare={false}
            />
            <Information data={data} display={characterTabIndex === 2} />
          </div>
          <nav className="character__tab" style={{ marginTop: "2rem" }}>
            <Button
              icon={<FaFlag className="character__icon" />}
              condition={socialTabToggle}
              onClick={() => setSocialTabToggle(true)}
              text="Company"
              title="Show free company"
              className="character__tab-btn"
              type="tab"
            />
            <Button
              icon={<FaUserFriends className="character__icon" />}
              condition={!socialTabToggle}
              onClick={() => setSocialTabToggle(false)}
              title="Show friends"
              text="Friends"
              className="character__tab-btn"
              type="tab"
            />
          </nav>
          <FreeCompany
            freeCompany={data.FreeCompany}
            freeCompanyMembers={data.FreeCompanyMembers}
            display={socialTabToggle}
          />
          <div className={"section" + (!socialTabToggle ? "" : " disabled")}>
            <Friends friends={data.Friends} />
          </div>
        </div>
        <div className="character__main">
          <nav className="character__tab">
            <Button
              icon={<MdWork className="character__icon" />}
              onClick={() => setJobsTabToggle(true)}
              condition={jobsTabToggle}
              title="Show jobs"
              text="Jobs"
              className="character__tab-btn"
              type="tab"
            />
            <Button
              icon={<MdPets className="character__icon" />}
              onClick={() => setJobsTabToggle(false)}
              condition={!jobsTabToggle}
              title="Show mounts and minions"
              text="Collection"
              className="character__tab-btn"
              type="tab"
            />
          </nav>
          <Jobs
            display={jobsTabToggle}
            jobs={data.Character.ClassJobs}
            displayPanel={displayPanel}
          />
          <Collection
            display={!jobsTabToggle}
            mounts={data.Mounts}
            minions={data.Minions}
          />
          <nav className="character__tab" style={{ marginTop: "2rem" }}>
            <Button
              icon={<FaScroll className="character__icon" />}
              onClick={() => setAchievementTabToggle(true)}
              condition={achievementTabToggle}
              title="Show quests and duties"
              text="Quests"
              className="character__tab-btn"
              type="tab"
            />
            <Button
              icon={<FaMedal className="character__icon" />}
              onClick={() => setAchievementTabToggle(false)}
              condition={!achievementTabToggle}
              text="Achievements"
              title="Show achievements"
              className="character__tab-btn"
              type="tab"
            />
          </nav>
          <Quests
            display={achievementTabToggle}
            achievementsList={data.Achievements.List}
            referenceCharacter={referenceCharacter}
          />
          {/* <Achievements
            display={!achievementTabToggle}
            achievements={data.Achievements}
            id={data.Character.ID}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Character;
