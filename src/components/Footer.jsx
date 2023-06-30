import "../styles/Footer.css";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        <b>© 2021 - {new Date().getFullYear()} XIV Tracker v1.3.1</b>. <br />
        <b>XIV Tracker</b> is Designed and Developed by Damon Greenhalgh.{" "}
        <b>XIV Tracker</b> is not officially endorsed by{" "}
        <b>SQUARE ENIX CO,. LTD</b>.<br />
        <b> FINAL FANTASY XIV CONTENT IS PROPERTY OF SQUARE ENIX CO,. LTD.</b>
      </p>
      <button style={{ marginLeft: "auto", minWidth: "max-content" }}>
        <a href="https://github.com/DamonGreenhalgh/xivtracker">
          <FaGithub size="1.25em" />
        </a>
      </button>
    </div>
  );
};

export default Footer;
