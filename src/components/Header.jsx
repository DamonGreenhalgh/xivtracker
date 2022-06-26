import Divider from './Divider';
import '../styles/Header.css';
const Header = (props) => {
    const {
        name,
        minor,
        major
    } = props;
    return (
        <div className="col gap-lg">
            <div className='header__content'>
                <h2>{name}</h2>
                <div className={'completion-rate' + (minor == null ? ' disabled' : '')}>
                    <h4>{minor}</h4>
                    <h3>{major}</h3>
                </div> 
            </div>
            <Divider />
        </div>
    );
}

export default Header;