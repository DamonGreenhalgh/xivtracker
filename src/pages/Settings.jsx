import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Splash from '../components/Splash';
import Button from '../components/utility/Button';

const Settings = (props) => {

    const [displayDropdown, setDisplayDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Set new content width
        document.documentElement.style.setProperty('--content-width', '30rem');
    }, [])

    return(
        <div className="settings">
            <Splash />
            <form className="settings__form">
                <h1>Settings</h1>
                <h3>Theme</h3>
                <p>Sets the visual theme of <b>XIV Tracker</b></p>
                <div 
                    className="select"
                    onClick={() => setDisplayDropdown(displayDropdown ? false : true)}
                >
                    {props.theme}
                    {displayDropdown ? <BsChevronUp /> : <BsChevronDown />}
                    <div 
                        className={displayDropdown ? "options" : "disabled"} 
                        onClick={(e) => props.setTheme(e.target.innerText)}
                    >
                        <div>light</div>
                        <div>dark</div>
                    </div>
                </div>
               
            </form>
            <Button content="Save" onClick={() => navigate(-1)} style={{width: "5rem"}} />
        </div>
    );
}

export default Settings;