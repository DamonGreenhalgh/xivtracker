// Hooks
import { useState } from "react";

// Components
import Button from "../components/Button";
import Stats from "../components/Stats";
import Information from "../components/Information";
import Equipment from "../components/Equipment";
import Divider from "../components/Divider";

// Assets
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";

// Style
import "../styles/Profile.css";

/**
 * @name Profile
 * @description The profile container. Contains character equipment, attributes
 * and general information about the character.
 * @param {*} props
 * @returns
 */
const Profile = (props) => {
  const { display, data } = props;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <h2>Profile</h2>
      <Divider />
      <div className="row gap-lg">
        <Equipment data={data} display={true} />
        <div className="col gap-lg width-max">
          <div className="row gap">
            <Button
              icon={<GiBattleGear className="character__icon" />}
              condition={tabIndex === 0}
              onClick={() => setTabIndex(0)}
              title="Show gearset"
              text="Gear"
              type="minor"
            />
            <Button
              icon={<IoStatsChart className="character__icon" />}
              condition={tabIndex === 1}
              onClick={() => setTabIndex(1)}
              title="Show character attributes"
              text="Attributes"
              type="minor"
            />
            <Button
              icon={<AiFillProfile className="character__icon" />}
              condition={tabIndex === 2}
              onClick={() => setTabIndex(2)}
              title="Show character information"
              text="Information"
              type="tab"
            />
          </div>
          <Stats data={data} display={tabIndex === 1} />
          <Information data={data} display={tabIndex === 2} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
