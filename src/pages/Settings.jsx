import './Settings.css';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import Footer from '../components/Footer';
import Splash from '../components/Splash';
import Checkbox from '../components/utility/Checkbox';
import Button from '../components/utility/Button';

const Settings = (props) => {

    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [useSystemTheme, setUseSystemTheme] = useState(true);
    const [isSafeMode, setIsSafeMode] = useState(true);
    const [disableCookies, setDisableCookies] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        
        // Load settings from local storage.
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings !== null) {
            setUseSystemTheme(settings.useSystemTheme);
            setIsSafeMode(settings.isSafeMode);
            setDisableCookies(settings.disableCookies);
        }
    }, [])

    const saveSettings = () => {
        localStorage.setItem('settings', JSON.stringify({
            'useSystemTheme': useSystemTheme,
            'isSafeMode': isSafeMode,
            'disableCookies': disableCookies
        }))
        navigate(-1)
    }

    return(
        <div className="settings">
            <Splash />
            <form className="settings__form">
                <h3>Theme</h3>
                <p>Change the visual theme of XIV Tracker.</p>
                <div 
                    className={displayDropdown ? "select select--dropdown" : "select"}
                    onClick={() => setDisplayDropdown(displayDropdown ? false : true)}
                >
                    {props.theme}
                    <BsChevronDown />
                    <div 
                        className={"options" + (displayDropdown ? " options--settings" : "")} 
                        onClick={(e) => props.setTheme(e.target.innerText)}
                    >
                        <div>light</div>
                        <div>dark</div>
                    </div>
                </div>
                <div className="settings__checkbox">
                    <Checkbox 
                        update={setUseSystemTheme} 
                        condition={useSystemTheme} 
                    />
                    <p>Use System Theme (On by default)</p>
                </div>
                <h3>Spoilers</h3>
                <p>
                    Enables safe mode, this will hide content that could spoil
                    story events in the game. Must have a valid character to reference.
                    Your character Loadstone ID can be found <a href="https://na.finalfantasyxiv.com/lodestone/character/">here.</a>
                </p>
                <div className="settings__checkbox">
                    <Checkbox 
                        update={setIsSafeMode} 
                        condition={isSafeMode} 
                    />
                    <p>Spoiler Safe Mode (On by default)</p>
                    
                </div>
                <input placeholder="https://na.finalfantasyxiv.com/lodestone/character/38592216/" />
                <h3>Privacy</h3>
                <p>
                    XIV Tracker uses cookies (and cookie like systems) to enhance
                    user experience. Some functions may not work properly if 
                    cookies are disabled.
                </p>
                <div className="settings__checkbox">
                    <Checkbox 
                        update={setDisableCookies} 
                        condition={disableCookies} 
                    />
                    <p>Disable Cookies</p>
                </div>
            </form>
            <Button content="Save" onClick={() => saveSettings()} style={{width: "5rem"}} />
            <Footer />
        </div>
    );
}

export default Settings;