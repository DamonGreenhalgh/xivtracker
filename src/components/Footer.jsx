import '../styles/Footer.css'
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <p>
        <b>XIV Tracker</b> is Designed and Developed by Damon Greenhalgh.<br/>
        <b>FINAL FANTASY XIV CONTENT IS PROPERTY OF SQUARE ENIX CO,. LTD.</b>
      </p>
      <p style={{marginLeft: 'auto', minWidth: 'max-content'}}><b>XIV Tracker v1.2.2</b></p>
      <button>
        <a href="https://github.com/DamonGreenhalgh/xivtracker">
          <FaGithub size="1.25em" />
        </a>
      </button>
    </div>
  );
}

export default Footer;