import brand from '../images/brand.png';
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';
import { RiSettings3Line } from 'react-icons/ri';
import { BiHelpCircle } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import Searchbar from './Searchbar';

const Navbar = (props) => {
    const {
        showSearchbar,
        referenceCharacter
    } = props;
    return (
        <nav className='navbar'>
            <Link to="/" title="Home">
                <img src={brand} className="navbar__brand-icon" alt="xiv tracker" />
            </Link>
            {
                showSearchbar ?
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
            {
                referenceCharacter !== null ?
                <Link to={"/" + referenceCharacter.Character.ID}>
                    <img 
                        src={referenceCharacter.Character.Avatar} 
                        className="navbar__profile-icon rounded interactable" 
                        title={referenceCharacter.Character.Name}
                        alt="reference character"
                    />
                </Link> :
                <CgProfile className="navbar__icon" /> 
            }
        </nav>
    );
}

export default Navbar;
