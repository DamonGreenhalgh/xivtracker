// Hooks
import { useState, useEffect } from "react";

// Components
import MiniBanner from "../components/Banner";
import Divider from "../components/Divider";
import Return from "../components/Return";
import FailToLoad from "../components/FailToLoad";

// Styles
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

const storyBreakpointsId = [
  1129, // Heavensward
  1691, // Stormblood
  2233, // Shadowbringers
  2851, // Endwalker
];

const Settings = (props) => {
  const [displayDropdown, setDisplayDropdown] = useState(-1);
  const {
    theme,
    setTheme,
    referenceCharacter,
    setReferenceCharacter,
    splash,
    setSplash,
  } = props;

  useEffect(() => {
    document.documentElement.style.setProperty("--content-width", "70rem");
    document.title = "XIV Tracker | Settings";
  }, []);

  return (
    <div className="settings">
      <div className="settings__form">
        <h1>Settings</h1>
        <Divider />
        <Return />
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

          <div className="col gap max-width">
            <h2>Experience</h2>
            <h3>Reference</h3>
            <p>
              Allocating a reference character will show/hide content based on
              the story progress of the character. This will prevent accidental
              spoilers when viewing other characters who are further along the
              story.
            </p>
            {referenceCharacter !== null ? (
              <>
                <MiniBanner character={referenceCharacter.Character} />
                <button
                  onClick={() => {
                    setReferenceCharacter(null);
                  }}
                  className="settings__reference-close"
                >
                  Remove
                </button>
              </>
            ) : (
              <FailToLoad type="referenceCharacterError" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
