import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import Jobs from "./Jobs";
import Collection from "./Collection";
import Quests from "./Quests";
import Achievements from "./Achievements";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import Button from "../components/Button";
import Stats from "../components/Stats";
import Equipment from "../components/Equipment";
import Information from "../components/Information";
import Friends from "../components/Friends";
import FreeCompany from "./FreeCompany";
import Featured from "../components/Featured";
import { MdWork, MdPets } from "react-icons/md";
import { FaScroll, FaMedal, FaUserFriends, FaFlag } from "react-icons/fa";
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import "../styles/Character.css";

const Character = () => {
  const { id } = useParams();
  const { data, loading, ok } = useFetchData(
    "https://xivapi.com/character/" + id + "?extended=1&data=AC,FC,MIMO,FR,FCM"
  );
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
      <div className="character__content">
        <div className="character__side">
          <Banner character={data.Character} />
          <Featured />
          <div className="section" style={{ zIndex: "3" }}>
            <nav className="character__tab">
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
            <Equipment data={data} display={characterTabIndex === 0} />
            <Stats data={data} display={characterTabIndex === 1} />
            <Information data={data} display={characterTabIndex === 2} />
          </div>
          <div className="section">
            <nav className="character__tab">
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
            <Friends friends={data.Friends} display={!socialTabToggle} />
          </div>
        </div>
        <div className="character__main">
          <div className="section">
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
            <Jobs display={jobsTabToggle} jobs={data.Character.ClassJobs} />
            <Collection
              display={!jobsTabToggle}
              mounts={data.Mounts}
              minions={data.Minions}
            />
          </div>
          <div className="section">
            <nav className="character__tab">
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
            />
            <Achievements
              display={!achievementTabToggle}
              achievements={data.Achievements}
              id={data.Character.ID}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
