import './Footer.css'
import { FaGithub } from 'react-icons/fa';

const Footer = (props) => {
  return (
    <div className="footer-wrapper">
      <div className={props.isHome ? "footer" : "footer footer--character"}>
        <p className="footer__text">
          Illustrations by Yusuke Mogi.<br/>
          <i>XIV Tracker</i> is Designed and Developed by Damon Greenhalgh.<br/>
          FINAL FANTASY XIV CONTENT IS PROPERTY OF SQUARE ENIX CO,. LTD.
        </p>
        <button>
          <a href="https://github.com/DamonGreenhalgh/xivtracker">
            <FaGithub size="1.5em" />
          </a>
        </button>
      </div>
    </div>
  );
}

export default Footer;
