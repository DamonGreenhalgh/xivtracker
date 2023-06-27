import { useState, useEffect } from "react";
import Divider from "../components/Divider";
import "../styles/Settings.css";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const splashName = [
  "None",
  "A Realm Reborn",
  "Heavensward",
  "Stormblood",
  "Shadowbringers",
  "Endwalker",
];

const Settings = (props) => {
  const [displayDropdown, setDisplayDropdown] = useState(-1);
  const { theme, setTheme, splash, setSplash } = props;

  useEffect(() => {
    document.title = "XIV Tracker | Settings";
  }, []);

  return (
    <div className="settings">
      <div className="settings__form">
        <h1>Settings</h1>
        <Divider />
        <div className="settings__row">
          <div className="col gap max-width">
            <h2>Appearance</h2>
            <h3>Theme</h3>
            <p>
              Sets the visual theme of <b>XIV Tracker</b>
            </p>
            <div
              className="select"
              onClick={() => setDisplayDropdown(displayDropdown === 0 ? -1 : 0)}
            >
              {theme}
              {displayDropdown === 0 ? <BsChevronUp /> : <BsChevronDown />}
              <div
                className={displayDropdown === 0 ? "options" : "disabled"}
                onClick={(e) => setTheme(e.target.innerText)}
              >
                <div>light</div>
                <div>dark</div>
              </div>
            </div>
            <h3>Splash</h3>
            <p>Select the background splash art to display.</p>
            <div
              className="select"
              onClick={() => setDisplayDropdown(displayDropdown === 1 ? -1 : 1)}
            >
              {splashName[splash]}
              {displayDropdown === 1 ? <BsChevronUp /> : <BsChevronDown />}
              <div
                className={displayDropdown === 1 ? "options" : "disabled"}
                onClick={(e) =>
                  setSplash(
                    Array.from(e.target.parentNode.children).indexOf(e.target)
                  )
                }
              >
                <div>None</div>
                <div>A Realm Reborn</div>
                <div>Heavensward</div>
                <div>Stormblood</div>
                <div>Shadowbringers</div>
                <div>Endwalker</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
