import './Settings.css';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';

const Settings = (props) => {
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const navigate = useNavigate();
    return(
        <div className="settings">
            <button onClick={() => navigate(-1)} className="return"><IoIosArrowRoundBack size="3em" /></button>
            <h1>Settings</h1>
            <form className="settings__form">
                <h3>Theme</h3>
                <div className={displayDropdown ? "select select--dropdown" : "select"} name="Theme"  onClick={() => setDisplayDropdown(displayDropdown ? false : true)}>
                    {props.theme}
                    <BsChevronDown />
                    <div className={"options" + (displayDropdown ? " options--settings" : "")} onClick={(e) => props.setTheme(e.target.innerText)}>
                        <div>light</div>
                        <div>dark</div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Settings;