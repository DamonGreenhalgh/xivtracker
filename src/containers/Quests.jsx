// Hooks
import { useEffect, useState } from "react";

// Components
import Navigator from "../components/Navigator";
import FailToLoad from "../components/FailToLoad";
import Completion from "../components/Completion";
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
const questDescription = [
  "* Main Scenario Quests are tracked by the completion of their associated final quest.",
  "* Dungeons are tracked by the 'Mapping the Realm' achievement structure which can be acquired by reaching the final room within a dungeon. It is possible for a character to have the associated achievement but did not defeat the final boss (although this case is rather rare).",
  "* Trials are tracked by the completion of their EXTREME variants.",
  "* Raids are tracked by the completion of the final turn of a tier. For example the completion of Asphodelos: The Fourth Circle would mark Asphodelos as complete.",
  "* High End Duties are tracked based on the completion of an ultimate duty or the final turn in a tier for a savage duty.",
];

/**
 * @name Quests
 * @description Container to hold quests.
 * @param {*} props
 * @returns
 */
const Quests = (props) => {
  const { display, achievementsList } = props;
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
          <p>{questDescription[i]}</p>
        </>
      );
    }
    setContent(content);
    setCompletion([completed, total]);
  }, []);

  return (
    <div className={display ? "col gap-lg" : " disabled"}>
      <div className="completion__container">
        <Completion
          title="Total"
          numerator={completion[0]}
          denominator={completion[1]}
        />
      </div>
      <Divider />
      {achievementsList.length === 0 ? (
        <FailToLoad type="achievementsPrivateError" />
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
