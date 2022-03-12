import Searchbar from './Searchbar';
import Banner from './Banner';
import brand from '../images/brand.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { VscSettings } from 'react-icons/vsc';

const Navbar = (props) => {

    return (
        <nav className="navbar-wrapper">
            <nav className="navbar">
                <Link to="/" title="Home"><img src={brand} className="navbar__brand-icon" /></Link>
                {/* <Banner {...props} /> */}
                <Searchbar search={props.search}/>
                <Link to="/settings" title="Settings">
                    <button><VscSettings className="navbar__icon" /></button>
                </Link>
            </nav>
        </nav>   
    );
}

export default Navbar;
