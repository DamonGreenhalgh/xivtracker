import "../styles/Loading.css";
import titan from "../images/titan.png";

const Loading = (props) => {
  const { full } = props;
  return (
    <div
      className={
        "col align-center justify-center gap-lg" + (full ? " full-page" : "")
      }
    >
      <img src={titan} className="loading__icon" alt="Loading Icon" />
      <p>Fetching data from Lodestone ...</p>
    </div>
  );
};

export default Loading;
