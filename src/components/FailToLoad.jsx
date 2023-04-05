// Style
import "../styles/FailToLoad.css";
import cactuarSticker from "../images/cac.png";
import { Link } from "react-router-dom";

const FailToLoad = (props) => {
  const { type } = props;
  return (
    <div className="failtoload">
      <img src={cactuarSticker} style={{ maxHeight: "5rem" }} />
      {type === "referenceError" ? (
        <p>
          Hmmm, looks like there is currently no reference character set on this
          device. You can set a reference character by clicking{" "}
          <Link to={"/settings"} style={{ textDecoration: "underline" }}>
            here.
          </Link>
        </p>
      ) : (
        <p>
          Oops! XIV Tracker was unable to retrieve information for this
          character. This could be because achievements are private on this
          character. You can change these settings{" "}
          <a
            href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/"
            style={{ textDecoration: "underline" }}
          >
            here.
          </a>
          .
        </p>
      )}
    </div>
  );
};

export default FailToLoad;
