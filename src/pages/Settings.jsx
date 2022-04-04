import './Settings.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import Button from '../components/utility/Button';
import Banner from '../components/Banner';
import Divider from '../components/utility/Divider';
import Loading from '../components/utility/Loading';

const Settings = (props) => {

    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [referenceBanner, setReferenceBanner] = useState(null);
    const [isSearching, setIsSearching] = useState(false);
    const [statusText, setStatusText] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Set new content width
        document.documentElement.style.setProperty('--content-width', '30rem');
        props.setShowSearchbar(false);

        // Load reference character if it exists.
        const referenceCharacter = JSON.parse(localStorage.getItem('reference'));
        if (referenceCharacter !== null) {
            setReferenceBanner(() => 
                <Banner 
                    type='reference'
                    avatar={<img src={referenceCharacter.Character.Avatar} className='rounded' />}
                    name={referenceCharacter.Character.Name}
                    title={referenceCharacter.Character.Title.Name}
                    misc={referenceCharacter.Character.Server}
                />
            )
        }
    }, [])

    const requestData = async(id) => {

        setIsSearching(true);
        let referenceCharacter;

        await fetch("https://xivapi.com/character/" + id + "?extended=1&data=AC", {mode: 'cors'})
            .then(response => response.json())
            .then(data => referenceCharacter = data)
                
        if (referenceCharacter !== undefined) {
            localStorage.setItem('reference', JSON.stringify(referenceCharacter))
            props.setReferenceCharacter(referenceCharacter);
            setReferenceBanner(() => 
                <Banner 
                    type='reference'
                    avatar={<img src={referenceCharacter.Character.Avatar} className='rounded' />}
                    name={referenceCharacter.Character.Name}
                    title={referenceCharacter.Character.Title.Name}
                    misc={referenceCharacter.Character.Server}
                    link={"/" + id + "/character"}
                />
            )
            setStatusText("");
        } else {
            setStatusText("Character with ID: " + id + " does not exist.");
        }  

        setIsSearching(false);
    }

    const updateReference = (e) => {

        const id = e.target.value;

        // If the number of digits is correct, request character from xivapi.
        if (id.length == 8) {

            setIsSearching(true);
            requestData(id);
        }
    }

    return(
        <div className="settings">
            <div className="settings__form">
                <h1>Settings</h1>
                <Divider />
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
                <h3>Character</h3>
                <p>Select a reference character. Character progress will determine what information is hidden to you. This is to avoid spoilers.</p>
                {
                    isSearching ?
                    <Loading /> :
                    <input type='text' placeholder="Lodestone ID e.g. 38592216" onChange={(e) => updateReference(e)} />
                }
                
                {referenceBanner}
                <p>{statusText}</p>
               
            </div>
            <Button content="Save" onClick={() => navigate(-1)} style={{width: "5rem"}} />
        </div>
    );
}

export default Settings;