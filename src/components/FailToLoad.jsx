// Style
import "../styles/FailToLoad.css";
import cactuarSticker from "../images/cac.png";

const FailToLoad = () => {
  return (
    <div className="failtoload">
      <img src={cactuarSticker} style={{ maxHeight: "5rem" }} />
      <p>
        Oops! XIV Tracker was unable to retrieve information for this character.
        This could be because achievements are private on this character. You
        can change these settings{" "}
        <a
          href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
          style={{ textDecoration: "underline" }}
        >
          here
        </a>
        .
      </p>
    </div>
  );
};

export default FailToLoad;
