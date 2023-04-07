// Hooks
import { useEffect, useState } from "react";

// Components
import Achievement from "../components/Achievement";
import Navigator from "../components/Navigator";
import FailToLoad from "../components/FailToLoad";
import CompletionMetric from "../components/CompletionMetric";
import Divider from "../components/Divider";

// Style
import "../styles/Achievements.css";
import { FaSearch } from "react-icons/fa";

const totalAchievements = 2864;
const capacity = 8;
/**
 * @name Achievements
 * @description Container for character achievements.
 * @param {*} props
 * @returns
 */
const Achievements = (props) => {
  const { display, achievements } = props;
  const [index, setIndex] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [possibleAchievements, setPossibleAchievements] = useState([]);

  useEffect(() => {
    setPossibleAchievements(
      achievements.List.filter((achievement) =>
        achievement.Name.toLowerCase().includes(searchInput)
      )
    );
    setIndex(0);
  }, [searchInput]);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <div className="row justify-between">
        <h2>Achievements</h2>
        <CompletionMetric
          numerator={achievements.List.length}
          denominator={totalAchievements}
        />
      </div>
      <Divider />
      {achievements.List.length === 0 ? (
        <FailToLoad />
      ) : (
        <>
          <div className="row gap align-center">
            <input
              type="text"
              placeholder="Search"
              className="collection__searchbar"
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <FaSearch className="character__icon" />
          </div>
          <ul className="col gap">
            {possibleAchievements
              .slice(index * capacity, (index + 1) * capacity)
              .map((achievement) => (
                <Achievement
                  name={achievement.Name}
                  icon={achievement.Icon}
                  points={achievement.Points}
                  id={achievement.ID}
                  key={achievement.ID}
                />
              ))}
          </ul>
          <Navigator
            update={setIndex}
            current={index}
            min={0}
            max={Math.ceil(possibleAchievements.length / capacity) - 1}
            style={{ margin: "auto" }}
          />
        </>
      )}
    </div>
  );
};

export default Achievements;
