import brand from '../images/brand.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { GoSettings } from 'react-icons/go';
import { RiQuestionMark } from 'react-icons/ri';

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" title="Home" style={{marginRight: "auto"}}>
                <img src={brand} className="navbar__brand-icon" />
            </Link>
            <Link to="/settings" title="Settings">
                <button><GoSettings className="navbar__icon" /></button>
            </Link>
            <Link to="/settings" title="Settings">
                <button><RiQuestionMark className="searchbar__icon" /></button>
            </Link>
        </nav>
    );
}

export default Navbar;
