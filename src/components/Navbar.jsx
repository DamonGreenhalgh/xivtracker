import Searchbar from './Searchbar';
import brand from '../images/brand.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar-wrapper">
            <nav className="navbar">
                <Link to="/" title="Home"><img src={brand} className="navbar__brand-icon" /></Link>
                <Searchbar search={props.search}/>
            </nav>
        </nav>   
    );
}

export default Navbar;
