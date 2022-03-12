import './Settings.css';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Settings = (props) => {
    const navigate = useNavigate();
    const updateTheme = (e) => {
        props.setThemeIndex(e.target.selectedIndex);
        localStorage.setItem("theme", e.target.selectedIndex);
    }
    return(
        <div className="settings">
            <button onClick={() => navigate(-1)}><IoIosArrowRoundBack className="return" /></button>
            <form className="settings__form">
                <h1 style={{marginBottom: "2rem"}}>Settings</h1>
                <h3>Theme</h3>
                <div className='divider--horizontal' />
                <select className="themes-dropbox" value={props.themeIndex} name="Theme" onChange={(e) => updateTheme(e)}>
                    <option value="0">Light</option>
                    <option value="1">Dark</option>
                </select>
            </form>
        </div>
    );
}

export default Settings;