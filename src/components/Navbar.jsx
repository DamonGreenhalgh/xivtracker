import brand from '../images/brand.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { RiSettings3Line } from 'react-icons/ri';
import { BiHelpCircle } from 'react-icons/bi';
import Searchbar from './Searchbar';

const Navbar = (props) => {
    let profile;
    if (props.referenceCharacter !== null) {
        profile = 
        <Link to={"/" + props.referenceCharacter.Character.ID}>
            <img 
                src={props.referenceCharacter.Character.Avatar} 
                className="navbar__profile-icon rounded interactable" 
                title={props.referenceCharacter.Character.Name}
            />
        </Link>
    }
    return (
        <nav className='navbar'>
            <Link to="/" title="Home">
                <img src={brand} className="navbar__brand-icon" />
            </Link>
            {
                props.showSearchbar ?
                <Searchbar 
                    search={(name, server) => window.location.href = "./?name=" + name + "&server=" + server} 
                    type='character'
                /> : 
                null
            }
            <Link to="/help" title="Help" style={{marginLeft: "auto"}}>
                <button><BiHelpCircle className="navbar__icon" /></button>
            </Link>
            <Link to="/settings" title="Settings">
                <button><RiSettings3Line className="navbar__icon" /></button>
            </Link>
            {profile}
        </nav>
    );
}

export default Navbar;
