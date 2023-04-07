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

// Style
import { MdWork, MdPets } from "react-icons/md";
import { FaScroll, FaMedal, FaUserFriends, FaFlag } from "react-icons/fa";
import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";
import "../styles/Character.css";
import Divider from "../components/Divider";
import { ImDiamonds } from "react-icons/im";

/**
 * @name Character
 * @description This component represents the character profile page.
 * @param {*} props
 * @returns
 */
const Character = (props) => {
  const { id } = useParams();
  const { data, loading } = useFetchData(
    "https://xivapi.com/character/" + id + "?extended=1&data=AC,FC,MIMO,FR,FCM"
  );
  const [index, setIndex] = useState(0);
  const [sideTabIndex, setSideTabIndex] = useState(0);
  const [socialTabIndex, setSocialTabIndex] = useState(0);
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
      <Banner character={data.Character} />
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
          <nav className="character__tab" style={{ marginTop: "2rem" }}>
            <Button
              content={<FaFlag className="character__icon" />}
              condition={socialTabIndex === 0}
              onClick={() => setSocialTabIndex(0)}
              title="Company"
              className="character__tab-btn"
            />
            <Button
              content={<FaUserFriends className="character__icon" />}
              condition={socialTabIndex === 1}
              onClick={() => setSocialTabIndex(1)}
              title="Friends"
              className="character__tab-btn"
            />
          </nav>

          <div
            className={"section" + (socialTabIndex === 0 ? "" : " disabled")}
          >
            <div className="row gap">
              <div
                className="relative"
                style={{ minWidth: "5rem", minHeight: "5rem" }}
              >
                <img
                  src={data.FreeCompany.Crest[0]}
                  className="absolute"
                  style={{ maxHeight: "5rem" }}
                  alt=""
                />
                <img
                  src={data.FreeCompany.Crest[1]}
                  className="absolute"
                  style={{ maxHeight: "5rem" }}
                  alt=""
                />
                <img
                  src={data.FreeCompany.Crest[2]}
                  className="absolute"
                  style={{ maxHeight: "5rem" }}
                  alt=""
                />
              </div>
              <div className="col gap-sm">
                <h2>
                  {data.FreeCompany.Name + " [" + data.FreeCompany.Tag + "]"}
                </h2>
                <p>{data.FreeCompany.Slogan}</p>
              </div>
              <div
                className="row gap-sm "
                style={{ color: "var(--color-completed)", marginLeft: "auto" }}
              >
                <p>{data.FreeCompany.Server}</p>
                <ImDiamonds style={{ maxHeight: "1rem", minWidth: "1rem" }} />
              </div>
            </div>
            <Divider />
            <h4>Members</h4>
            <Friends friends={data.FreeCompanyMembers} />
          </div>
          <div
            className={"section" + (socialTabIndex === 1 ? "" : " disabled")}
          >
            <Friends friends={data.Friends} />
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
