import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Notice from '../components/Notice';
import Banner from '../components/Banner';
import Equipment from '../components/Equipment';
import Jobs from '../components/Jobs';
import Collection from '../components/Collection';
import Attributes from '../components/Attributes';
import Quests from '../components/Quests';
import Loading from '../components/utility/Loading';
import './Character.css';

const Character = (props) => {

    const [equipmentProps, setEquipmentProps] = useState(null);
    const [freeCompanyProps, setFreeCompanyProps] = useState({isDisabled: true});
    const [jobsProps, setJobsProps] = useState(null);
    const [attributeProps, setAttributeProps] = useState(null);
    const [questsProps, setQuestsProps] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
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
 
        setEquipmentProps({
            portrait: characterData.Portrait,
            level: characterData.ActiveClassJob.Level,
            gear: characterData.GearSet.Gear
        });

        // Only update free company props if the character belongs to
        // a free company.
        if (freeCompanyData !== null) {
            setFreeCompanyProps({
                type: "free-company",
                name: freeCompanyData.Name,
                title: freeCompanyData.Slogan,
                isPrefix: false,
                server: "Rank: " + freeCompanyData.Rank,
                isCrest: true,
                avatar: freeCompanyData.Crest
            })
        }

        setJobsProps({jobs: characterData.ClassJobs});
        setAttributeProps({content: characterData.GearSet.Attributes});
        setQuestsProps ({id: characterData.ID});

        // Completed loading, update.
        setIsLoading(() => false);
    }, []);

    return (
        isLoading ?
        <Loading /> :
        <div className="character">
            <div className="character__row">
                <div className="col gap-lg max-width">
                    <Equipment {...equipmentProps} />
                    <Banner {...freeCompanyProps} />
                    <Collection id={id} />
                </div>
                <div className="col gap-lg max-width">
                    <Attributes {...attributeProps} />
                    <Jobs {...jobsProps} />
                </div>
            </div>
            <Notice type={2} show={true}/>
            <Quests {...questsProps}/>
        </div>
    );
}

export default Character;