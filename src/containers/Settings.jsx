// Hooks
import { useState, useEffect } from 'react';

// Assets
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';

// Components
import Button from '../components/Button';
import Banner from '../components/Banner';
import Divider from '../components/Divider';
import Loading from '../components/Loading';
import Checkbox from '../components/Checkbox';
import Return from '../components/Return';

// Styles
import '../styles/Settings.css';

const splashName = [
    'None',
    'A Realm Reborn',
    'Heavensward',
    'Stormblood',
    'Shadowbringers',
    'Endwalker'
]

const storyBreakpointsId = [
    1129,    // Heavensward
    1691,    // Stormblood
    2233,    // Shadowbringers
    2851     // Endwalker
]

const Settings = (props) => {

    const [displayDropdown, setDisplayDropdown] = useState(-1);
    const [referenceBanner, setReferenceBanner] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");
    const {
        setShowSearchbar,
        theme,
        setTheme,
        referenceCharacter,
        setReferenceCharacter,
        splash,
        setSplash,
        personalized,
        setPersonalized
    } = props;

    // Mount
    useEffect(() => {

        // Set new content width
        document.documentElement.style.setProperty('--content-width', '70rem');
        setShowSearchbar(false);
        document.title = "XIV Tracker | Settings";

        // Update reference character data.
        if (referenceCharacter !== null) {
            requestData(referenceCharacter.Character.ID);
        }

    }, [])

    const requestData = async(id) => {
        setIsSearching(true);
        await fetch("https://xivapi.com/character/" + id + "?extended=1&data=AC", {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                if (!data.Error) {
                    
                    // Update reference character.
                    setReferenceCharacter(data);
                    
                    // Set banner.
                    setReferenceBanner(() => 
                        <Banner 
                            type='reference'
                            avatar={<img src={data.Character.Avatar} className='rounded' alt="character avatar" />}
                            name={data.Character.Name}
                            title={data.Character.Title.Name}
                            misc={data.Character.Server}
                            link={"/" + id}
                        />
                    )
        
                    // Set background splash according to reference character.
                    if (personalized) {
                        let breakpoint = 0;
                        for (let i = 0; i < data.Achievements.List.length; i++) {
                            if (storyBreakpointsId.includes(data.Achievements.List[i].ID)) {
                                breakpoint++;
                            }
                        }
                        setSplash(breakpoint + 1)
                    }

                    setError("");
                } else {
                    setError('No character associated with Lodestone ID: "' + id + '"');
                }
            })
        setIsSearching(false);
    }

    return(
        <div className="settings">
            <div className="settings__form">
                <h1>Settings</h1>
                <Divider />
                <Return />
                <div className='settings__row'>

                    <div className='col gap max-width'>
                        <h2>Appearance</h2>
                        <h3>Theme</h3>
                        <p>Sets the visual theme of <b>XIV Tracker</b></p>
                        <div 
                            className="select"
                            onClick={() => setDisplayDropdown(displayDropdown === 0 ? -1 : 0)}
                        >
                            {theme}
                            {displayDropdown === 0 ? <BsChevronUp /> : <BsChevronDown />}
                            <div 
                                className={displayDropdown === 0 ? "options" : "disabled"} 
                                onClick={(e) => setTheme(e.target.innerText)}
                            >
                                <div>light</div>
                                <div>dark</div>
                            </div>
                        </div>
                        <h3>Splash</h3>
                        <p>Select the background splash art to display.</p>
                        <div 
                            className={"select" + (personalized ? ' select--disabled' : '')}
                            onClick={() => 
                                personalized
                                ? null
                                : setDisplayDropdown(displayDropdown === 1 ? -1 : 1)
                            }
                        >
                            {splashName[splash]}
                            {displayDropdown === 1 ? <BsChevronUp /> : <BsChevronDown />}
                            <div 
                                className={displayDropdown === 1 ? "options" : "disabled"}
                                onClick={(e) => 
                                    personalized
                                    ? null
                                    : setSplash(Array.from(e.target.parentNode.children).indexOf(e.target))
                                }
                            >
                                <div>None</div>
                                <div>A Realm Reborn</div>
                                <div>Heavensward</div>
                                <div>Stormblood</div>
                                <div>Shadowbringers</div>
                                <div>Endwalker</div>
                            </div>
                        </div>
                        <div className='row align-center gap'>
                            <Checkbox type='square' condition={personalized} update={setPersonalized} />
                            <p>Use reference character to determine splash</p>
                        </div>
                    </div>

                    <div className='col gap max-width'>
                        <h2>Experience</h2>
                        <h3>Reference</h3>
                        <p>
                            Allocating a reference character will show/hide content based on the story 
                            progress of the character. This will prevent accidental spoilers when viewing 
                            other characters who are further along the story. <b>XIV Tracker</b> requires 
                            the Lodestone ID of the character to reference.
                        </p>
                        {
                            referenceCharacter !== null ?
                            <div className="relative">
                                {referenceBanner}     
                                <button 
                                    onClick={() => {setReferenceCharacter(null); setReferenceBanner(null)}} 
                                    className="settings__reference-close">
                                    <IoClose size="2em" />
                                </button>
                            </div> :
                            null
                        }
                        {
                            isSearching ?
                            <Loading /> :
                            <div className='row'>
                                <input style={{flex: '3'}} type='text' placeholder="Lodestone ID e.g. 38592216" />
                                <Button style={{flex: '1'}} onClick={(e) => requestData((e.target.parentNode.firstChild.value))} content="Search"/>
                            </div>
                        }      
                        <p style={{color: "red"}}>{error}</p>       
                    </div>
                </div>       
            </div>
        </div>
    );
}

export default Settings;