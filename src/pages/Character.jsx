import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'; 
import { useParams } from 'react-router-dom';
import Banner from '../components/Banner';
import Equipment from '../components/Equipment';
import Jobs from '../components/Jobs';
import Collection from '../components/Collection';
import Attributes from '../components/Attributes';
import Quests from '../components/Quests';
import Loading from '../components/utility/Loading';
import './Character.css';

import Button from '../components/utility/Button';

const Character = (props) => {

    const [equipmentProps, setEquipmentProps] = useState(null);
    const [freeCompanyProps, setFreeCompanyProps] = useState({isDisabled: true});
    const [jobsProps, setJobsProps] = useState(null);
    const [attributeProps, setAttributeProps] = useState(null);
    const [questsProps, setQuestsProps] = useState(null);
    const [characterProps, setCharacterProps] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activePanel, setActivePanel] = useState(0);
    const { id } = useParams();

    // This function stores the currently viewed character in the recent list 
    // for searchbar use.
    const storeRecent = (data) => {

        // Define new character object.
        const character = {
            name: data.Name,
            avatar: data.Avatar,
            id: data.ID,
            server: data.Server
        }

        // Retrieve 'recent' variable from local storage.
        let recent = JSON.parse(localStorage.getItem("recent"));

        // First time user, create recent array.
        if (recent === null) {
            recent = [];
        }

        // Check if the character is in the recent array, if it is, remove it.
        for (let i = 0; i < recent.length; i++) {
            if (recent[i].id == character.id) {
                recent.splice(i, 1);
            }
        }

        // Add character to the front of the array. Indicates most recently
        // viewed character.
        recent.unshift(character);

        // If recent array is at max capacity, remove the last element.
        if (recent.length > 6) {
            recent.pop();
        }

        // Store 'recent' back into local storage.
        localStorage.setItem("recent", JSON.stringify(recent));
    }


    // On mount, fetch character data, update component props with retrieved data.
    useEffect(async () => {
        setIsLoading(true);

        // Enable searchbar on navbar.
        props.setShowSearchbar(true);
        
        let characterData, freeCompanyData;

        // Get extended character data from xivapi.com
        await fetch("https://xivapi.com/character/" + id + "?extended=1&data=FC", {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                characterData = data.Character;
                freeCompanyData = data.FreeCompany;
            });

        // Set window title to 'XIV Tracker | {character name}'
        document.title = "XIV Tracker | " + characterData.Name;

        // Set new content width
        document.documentElement.style.setProperty('--content-width', '70rem');

        // Add character to recently viewed list.
        storeRecent(characterData);
            
        setCharacterProps({
            type: '',
            avatar: <img src={characterData.Avatar} className='rounded' />,
            name: characterData.Name,
            title: characterData.Title.Name,
            misc: characterData.Server
        })

        setEquipmentProps({
            portrait: characterData.Portrait,
            level: characterData.ActiveClassJob.Level,
            gear: characterData.GearSet.Gear,
            name: characterData.ActiveClassJob.Job.Name,
            exp: [characterData.ActiveClassJob.ExpLevel, characterData.ActiveClassJob.ExpLevelMax],
            icon: characterData.ActiveClassJob.Job.Icon
        });

        // Only update free company props if the character belongs to
        // a free company.
        if (freeCompanyData !== null) {
            setFreeCompanyProps({
                type: 'free-company',
                avatar: 
                <div className="icon--mid relative">
                    <img src={freeCompanyData.Crest[0]} className="icon--mid absolute" />
                    <img src={freeCompanyData.Crest[1]} className="icon--mid absolute" />
                    <img src={freeCompanyData.Crest[2]} className="icon--mid absolute" />
                </div>
                ,
                fc: freeCompanyData.Crest,
                name: freeCompanyData.Name,
                content: freeCompanyData.Slogan,
                misc: "Rank: " + freeCompanyData.Rank
            })
        }

        setJobsProps({jobs: characterData.ClassJobs});
        setAttributeProps({data: characterData});
        setQuestsProps ({
            id: characterData.ID, 
            referenceCharacter: props.referenceCharacter
        });

        // Completed loading, update.
        setIsLoading(() => false);
    }, [id]);

    return (
        isLoading ?
        <Loading full={true} /> :

        <div className="character">

            <Banner {...characterProps} />

            <nav className='character__nav'>
                <Button 
                    content="Equipment" 
                    type='nav' 
                    onClick={() => setActivePanel(0)} 
                    condition={activePanel == 0} 
                />
                <Button 
                    content="Jobs" 
                    type='nav' 
                    onClick={() => setActivePanel(1)} 
                    condition={activePanel == 1} 
                />
                <Button 
                    content="Collection" 
                    type='nav'
                    onClick={() => setActivePanel(2)} 
                    condition={activePanel == 2} 
                />
                <Button 
                    content="Quests" 
                    type='nav' 
                    onClick={() => setActivePanel(3)} 
                    condition={activePanel == 3} 
                />
            </nav>

            <div className={'character__panel' + (activePanel == 0 ? '' : ' disabled')}>
                <Attributes {...attributeProps} />
                <div className='col gap-lg'>
                    <Equipment {...equipmentProps} />
                    <Banner {...freeCompanyProps} />
                </div>
            </div>

            <div className={'character__panel' + (activePanel == 1 ? '' : ' disabled')}>
                <Jobs {...jobsProps} />
            </div>

            <div className={'character__panel' + (activePanel == 2 ? '' : ' disabled')}>
                <Collection id={id} />
            </div>

            <div className={'character__panel' + (activePanel == 3 ? '' : ' disabled')}>
                <Quests {...questsProps}/>
            </div>

        </div>
    );
}

export default Character;