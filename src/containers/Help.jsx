import { useEffect } from "react";
import Divider from "../components/Divider";

const Help = () => {
  useEffect(() => {
    document.title = "XIV Tracker | Help";
  }, []);

  return (
    <div className="settings">
      <h1>FAQ</h1>
      <Divider />
      <div className="settings__row">
        <div className="col gap max-width">
          <h2>"Why can't I see my quests and achievements?"</h2>
          <p>
            XIV Tracker uses a characters achievements to determine quest
            completions. Lodestone has achievements set to private by default.
            You can change these settings{" "}
            <a
              href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
              style={{ textDecoration: "underline" }}
            >
              here
            </a>
            .
          </p>
          <h2>"Is XIV Tracker spoiler free?"</h2>
          <p>
            By default XIV Tracker will hide content that could be considered a
            spoiler for the main scenario questline. In order to see this
            content you must assign a reference character that has completed the
            content.
          </p>
        </div>
        <div className="col gap max-width">
          <h2>"I just got a new mount but it does not show up here?"</h2>
          <p>
            XIV Tracker is dependent on resources such as the official Lodestone
            site. Loadestone itself updates approximately every 12 hours. XIV
            Tracker can only show data from the most recent update.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
