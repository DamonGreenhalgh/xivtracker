import Divider from './utility/Divider';
import './Header.css';
const Header = (props) => {
    return (
        <div className="col gap-lg">
            <div className='header__content'>
                <h2>{props.name}</h2>
                <div className='completion-rate'>
                    <h4>{props.minor}</h4>
                    <h3>{props.major}</h3>
                </div> 
            </div>
            <Divider />
        </div>
    );
}

export default Header;