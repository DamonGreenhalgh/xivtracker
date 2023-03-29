// Hooks
import { useState } from "react";

// Components
import Achievement from "../components/Achievement";
import Header from "../components/Header";
import Navigator from "../components/Navigator";

// Style
import "../styles/Achievements.css";

/**
 * @name Achievements
 * @description Container for character achievements.
 * @param {*} props
 * @returns
 */
const Achievements = (props) => {
  const { display, achievements } = props;
  const capacity = 8;
  const [index, setIndex] = useState(0);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <Header name="Achievements" minor="Points" major={achievements.Points} />
      <ul className="col gap">
        {achievements.List.slice(index * capacity, (index + 1) * capacity).map(
          (achievement) => (
            <Achievement
              name={achievement.Name}
              icon={achievement.Icon}
              points={achievement.Points}
              id={achievement.ID}
              key={achievement.ID}
            />
          )
        )}
      </ul>
      <Navigator
        update={setIndex}
        current={index}
        min={0}
        max={Math.ceil(achievements.List.length / capacity) - 1}
        style={{ margin: "auto" }}
      />
    </div>
  );
};

export default Achievements;
