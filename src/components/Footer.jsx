import './Footer.css'

const Footer = (props) => {
  return (
    <div className="footer-wrapper">
      <div className={props.isHome ? "footer" : "footer footer--character"}>
        <p className="footer__text">
			<i>XIV Tracker</i> is Designed and Developed by Damon Greenhalgh.<br />
			FINAL FANTASY XIV CONTENT IS PROPERTY OF SQUARE ENIX CO,. LTD.
        </p>
        <a className="icon icon--footer" href="https://github.com/DamonGreenhalgh/xivtracker">
			<i className="fa-brands fa-github fa-lg"></i>
        </a>
      </div>  
    </div>
  );
}

export default Footer;
