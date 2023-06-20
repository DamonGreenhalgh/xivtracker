// Hooks
import { useState } from "react";

// Components
import Achievement from "../components/Achievement";
import Navigator from "../components/Navigator";
import FailToLoad from "../components/FailToLoad";
import Completion from "../components/Completion";
import Divider from "../components/Divider";

// Style
import "../styles/Achievements.css";

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

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <div className="completion__container">
        <Completion
          title="Total"
          numerator={achievements.List.length}
          denominator={totalAchievements}
        />
      </div>
      <Divider />
      {achievements.List.length === 0 ? (
        <FailToLoad type="achievementsPrivateError" />
      ) : (
        <>
          <ul className="col gap">
            {achievements.List.slice(
              index * capacity,
              (index + 1) * capacity
            ).map((achievement) => (
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
            max={Math.ceil(achievements.List.length / capacity) - 1}
            style={{ margin: "auto" }}
          />
        </>
      )}
    </div>
  );
};

export default Achievements;
