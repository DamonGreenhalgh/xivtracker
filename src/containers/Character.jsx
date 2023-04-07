// Hooks
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";

// Components
import Profile from "./Profile";
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

// Style
import { MdWork, MdPets, MdCompareArrows } from "react-icons/md";
import { FaScroll, FaMedal } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import "../styles/Character.css";

/**
 * @name Character
 * @description This component represents the character profile page.
 * @param {*} props
 * @returns
 */
const Character = (props) => {
  const { id } = useParams();
  const { data, loading } = useFetchData(
    "https://xivapi.com/character/" + id + "?extended=1&data=AC,FC,MIMO,FR"
  );
  const [index, setIndex] = useState(0);
  const [sideTabIndex, setSideTabIndex] = useState(0);
  const { referenceCharacter, displayPanel, setDisplayPanel } = props;

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
        name: data.Name,
        avatar: data.Avatar,
        id: data.ID,
        server: data.Server,
      };

      // Retrieve 'recent' variable from local storage.
      let recent = JSON.parse(localStorage.getItem("recent"));

      // First time user, create recent array.
      if (recent === null) {
        recent = [];
      }

      // Check if the character is in the recent array, if it is, remove it.
      for (let i = 0; i < recent.length; i++) {
        if (recent[i].id === character.id) {
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

    document.documentElement.style.setProperty("--content-width", "70rem");
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
        gender={data.Character.Gender}
        race={data.Character.Race.Name}
        tribe={data.Character.Tribe.Name}
      />

      <div className="character__content">
        <div className="character__side">
          <nav className="character__tab">
            <Button
              content={<GiBattleGear className="character__icon" />}
              condition={sideTabIndex === 0}
              onClick={() => setSideTabIndex(0)}
              title="Gear"
              className="character__tab-btn"
            />
            <Button
              content={<IoStatsChart className="character__icon" />}
              condition={sideTabIndex === 1}
              onClick={() => setSideTabIndex(1)}
              title="Attributes"
              className="character__tab-btn"
            />
            <Button
              content={<AiFillProfile className="character__icon" />}
              condition={sideTabIndex === 2}
              onClick={() => setSideTabIndex(2)}
              title="Information"
              className="character__tab-btn"
            />
          </nav>
          <div className="section">
            <Equipment data={data} display={sideTabIndex === 0} />
            <Stats
              data={data}
              referenceCharacter={referenceCharacter}
              display={sideTabIndex === 1}
              compare={false}
            />
            <Information data={data} display={sideTabIndex === 2} />
          </div>
        </div>
        <div className="character__main">
          <nav className="character__tab">
            <Button
              content={<MdWork className="character__icon" />}
              onClick={() => setIndex(0)}
              condition={index === 0}
              title="Jobs"
              className="character__tab-btn"
            />
            <Button
              content={<MdPets className="character__icon" />}
              onClick={() => setIndex(1)}
              condition={index === 1}
              title="Collection"
              className="character__tab-btn"
            />
            <Button
              content={<FaScroll className="character__icon" />}
              onClick={() => setIndex(2)}
              condition={index === 2}
              title="Quests"
              className="character__tab-btn"
            />
            <Button
              content={<FaMedal className="character__icon" />}
              onClick={() => setIndex(3)}
              condition={index === 3}
              title="Achievements"
              className="character__tab-btn"
            />
          </nav>
          <Jobs
            display={index === 0}
            jobs={data.Character.ClassJobs}
            displayPanel={displayPanel}
          />
          <Collection
            display={index === 1}
            mounts={data.Mounts}
            minions={data.Minions}
          />
          <Quests
            display={index === 2}
            achievementsList={data.Achievements.List}
            referenceCharacter={referenceCharacter}
          />
          <Achievements
            display={index === 3}
            achievements={data.Achievements}
            id={data.Character.ID}
          />
        </div>
      </div>
    </div>
  );
};

export default Character;
