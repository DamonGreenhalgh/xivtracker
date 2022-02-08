import Searchbar from './Searchbar';
import Banner from './Banner';
import './Navbar.css';

const Navbar = (props) => {

    return (
        <nav className="navbar-wrapper">
            <div className="navbar">
                <Banner {...props} />
                <Searchbar search={props.search}/>
            </div>
        </nav>   
    );
}

export default Navbar;
