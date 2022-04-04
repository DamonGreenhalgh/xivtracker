import brand from '../images/brand.png';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { RiSettings3Line } from 'react-icons/ri';
import Searchbar from './Searchbar';

const Navbar = (props) => {
    return (
        <nav className="navbar">
            <Link to="/" title="Home">
                <img src={brand} className="navbar__brand-icon" />
            </Link>
            {
                props.showSearchbar ?
                <Searchbar search={(name, server) => window.location.href = "../?name=" + name + "&server=" + server} /> : 
                null
            }
            <Link to="/settings" title="Settings" style={{marginLeft: "auto"}}>
                <button><RiSettings3Line className="navbar__icon" /></button>
            </Link>
            {
                props.referenceCharacter !== null ?
                <Link to={"/" + props.referenceCharacter.Character.ID + "/character"}>
                    <img 
                        src={props.referenceCharacter.Character.Avatar} 
                        className="navbar__profile-icon rounded interactable" 
                        title={props.referenceCharacter.Character.Name}
                    />
                </Link> :
                null
            }
        </nav>
    );
}

export default Navbar;
