// Hooks
import { useEffect, useState } from "react";

// Components
import Navigator from "../components/Navigator";
import FailToLoad from "../components/FailToLoad";
import CompletionMetric from "../components/CompletionMetric";
import Divider from "../components/Divider";

// Data
import questsJSON from "../data/quests.json";

// Assets
import { FaCheck } from "react-icons/fa";
import meteorIcon from "../images/meteor.png";
import dungeonIcon from "../images/dungeons.png";
import trialIcon from "../images/trials.png";
import raidIcon from "../images/raids.png";
import highEndIcon from "../images/high-end-duty.png";
import msqIcon from "../images/meteor.png";

// Styles
import "../styles/Quests.css";

const questIcon = [meteorIcon, dungeonIcon, trialIcon, raidIcon, highEndIcon];

/**
 * @name Quests
 * @description Container to hold quests.
 * @param {*} props
 * @returns
 */
const Quests = (props) => {
  const { display, achievementsList, referenceCharacter } = props;
  const [panel, setPanel] = useState(0);
  const [content, setContent] = useState([]);
  const [completion, setCompletion] = useState([0, 0]);
  const maxPanel = 4;

  useEffect(() => {
    // Collect all character achievement ids
    const achievementIds = [];
    for (let i = 0; i < achievementsList.length; i++) {
      achievementIds.push(achievementsList[i].ID);
    }

    // Collect up all reference character achivement ids
    const refAchievementIds = [];
    if (referenceCharacter !== null) {
      for (let i = 0; i < referenceCharacter.Achievements.List.length; i++) {
        refAchievementIds.push(referenceCharacter.Achievements.List[i].ID);
      }
    }

    let keys, values;
    let total = 0;
    let completed = 0;
    const eorzeadbBaseUrl =
      "https://na.finalfantasyxiv.com/lodestone/playguide/db/";
    const content = [];
    const headers = Object.keys(questsJSON);
    for (let i = 0; i < headers.length; i++) {
      keys = Object.keys(questsJSON[headers[i]]);
      values = Object.values(questsJSON[headers[i]]);
      content.push(
        <>
          <div className="row gap">
            <img src={questIcon[i]} className="icon--quests" alt="" />
            <h2>{headers[i]}</h2>
          </div>
          <div className="quests__list">
            {values.map((expansion, index) => (
              <div key={index}>
                <div className="quests__column">
                  <h3 className="quests__sub-header">{keys[index]}</h3>
                  {expansion.map((quest) => {
                    if (achievementIds.includes(quest.id)) {
                      completed++;
                    }
                    total++;
                    return (
                      <a
                        href={eorzeadbBaseUrl + quest.link}
                        className={
                          "eorzeadb_link" +
                          (quest.isSpoiler &&
                          !refAchievementIds.includes(quest.id)
                            ? " spoiler"
                            : "") +
                          (achievementIds.includes(quest.id)
                            ? " completed"
                            : "")
                        }
                        key={quest.id}
                      >
                        <FaCheck
                          className={
                            "icon" +
                            (achievementIds.includes(quest.id) ? "" : " hidden")
                          }
                        />
                        {quest.name}
                        {quest.isMainStory ? (
                          <img src={msqIcon} className="icon--msq" alt="" />
                        ) : null}
                      </a>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
    setContent(content);
    setCompletion([completed, total]);
  }, []);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <div className="row justify-between">
        <h2>Quests</h2>
        <CompletionMetric
          numerator={completion[0]}
          denominator={completion[1]}
        />
      </div>
      <Divider />
      {achievementsList.length === 0 ? (
        <FailToLoad />
      ) : (
        <>
          {content[panel]}
          <Navigator
            update={setPanel}
            current={panel}
            min={0}
            max={maxPanel}
            style={{ margin: "auto" }}
          />
        </>
      )}
    </div>
  );
};

export default Quests;
