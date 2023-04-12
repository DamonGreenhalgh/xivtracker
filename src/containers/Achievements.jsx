// Hooks
import { useEffect, useState } from "react";

// Components
import Achievement from "../components/Achievement";
import Navigator from "../components/Navigator";
import FailToLoad from "../components/FailToLoad";
import Completion from "../components/Completion";
import Divider from "../components/Divider";

// Style
import "../styles/Achievements.css";
import { FaSearch } from "react-icons/fa";

const totalAchievements = 2864;
const capacity = 10;
/**
 * @name Achievements
 * @description Container for character achievements.
 * @param {*} props
 * @returns
 */
const Achievements = (props) => {
  const { display, achievements } = props;
  const [index, setIndex] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [displayedAchievements, setDisplayedAchievements] = useState([]);
  const [filteredAchievements, setFilteredAchievements] =
    useState(achievements);

  const fillAchievements = () => {
    for (
      let i = index * capacity;
      i < Math.min((index + 1) * capacity, filteredAchievements.length);
      i++
    ) {
      setTimeout(() => {
        setDisplayedAchievements((displayedAchievements) => [
          ...displayedAchievements,
          <Achievement
            name={filteredAchievements[i].Name}
            icon={filteredAchievements[i].Icon}
            points={filteredAchievements[i].Points}
            id={filteredAchievements[i].ID}
            key={filteredAchievements[i].ID * Math.random()}
          />,
        ]);
      }, 100 * (i - index * capacity));
    }
  };

  useEffect(() => {
    setDisplayedAchievements([]);
    fillAchievements();
  }, [index]);

  useEffect(() => {
    // reset the displayed achievements
    setDisplayedAchievements([]);

    // filter achievements based on search term
    setFilteredAchievements(
      achievements.List.filter((achievement) =>
        achievement.Name.toLowerCase().includes(searchInput)
      )
    );

    setIndex(0);

    // display on page
    fillAchievements();
  }, [searchInput]);

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
            {/* {possibleAchievements
              .slice(index * capacity, (index + 1) * capacity)
              .map((achievement) => (
                <Achievement
                  name={achievement.Name}
                  icon={achievement.Icon}
                  points={achievement.Points}
                  id={achievement.ID}
                  key={achievement.ID}
                />
              ))} */}
            {displayedAchievements}
          </ul>
          <Navigator
            update={setIndex}
            current={index}
            min={0}
            max={Math.ceil(filteredAchievements.length / capacity) - 1}
            style={{ margin: "auto" }}
          />
        </>
      )}
    </div>
  );
};

export default Achievements;
