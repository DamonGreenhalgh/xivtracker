import './Footer.css'
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__text">
        <i>XIV Tracker</i> is Designed and Developed by Damon Greenhalgh.<br/>
        FINAL FANTASY XIV CONTENT IS PROPERTY OF SQUARE ENIX CO,. LTD.
      </p>
      <button>
        <a href="https://github.com/DamonGreenhalgh/xivtracker">
          <FaGithub size="1.25em" />
        </a>
      </button>
    </div>
  );
}

export default Footer;
