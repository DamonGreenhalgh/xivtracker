// Hooks
import { useState } from "react";

// Components
import Header from "../components/Header";
import Button from "../components/Button";
import Stats from "../components/Stats";
import Information from "../components/Information";
import Equipment from "../components/Equipment";

// Assets
import { GiBattleGear } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { AiFillProfile } from "react-icons/ai";

// Style
import "../styles/Profile.css";

const iconSize = "1em";
/**
 * @name Profile
 * @description The profile container. Contains character equipment, attributes
 * and general information about the character.
 * @param {*} props
 * @returns
 */
const Profile = (props) => {
  const { display, data, referenceCharacter } = props;
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={"section" + (display ? "" : " disabled")}>
      <Header name="Profile" />

      <div className="col gap-lg max-width">
        <div className="row gap">
          <Button
            content={<GiBattleGear size={iconSize} />}
            condition={tabIndex === 0}
            onClick={() => setTabIndex(0)}
            title="Gear"
          />
          <Button
            content={<IoStatsChart size={iconSize} />}
            condition={tabIndex === 1}
            onClick={() => setTabIndex(1)}
            title="Attributes"
          />
          <Button
            content={<AiFillProfile size={iconSize} />}
            condition={tabIndex === 2}
            onClick={() => setTabIndex(2)}
            title="Information"
          />
        </div>
        <Equipment data={data} display={tabIndex === 0} />
        <Stats
          data={data}
          referenceCharacter={referenceCharacter}
          display={tabIndex === 1}
          compare={false}
        />
        <Information data={data} display={tabIndex === 2} />
      </div>
    </div>
  );
};

export default Profile;
