import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Notice from '../components/Notice';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Equipment from '../components/Equipment';
import Jobs from '../components/Jobs';
import Collection from '../components/Collection';
import Attributes from '../components/Attributes';
import Quests from '../components/Quests';
import loadingIcon from '../images/loading.svg';
import './Character.css';

const Character = () => {

    const [bannerProps, setBannerProps] = useState(null);
    const [equipmentProps, setEquipmentProps] = useState(null);
    const [freeCompanyProps, setFreeCompanyProps] = useState({isDisabled: true});
    const [jobsProps, setJobsProps] = useState(null);
    const [attributeProps, setAttributeProps] = useState(null);
    const [questsProps, setQuestsProps] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();

    // On mount, fetch character data, update component props with retrieved data.
    useEffect(async () => {
        
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

        // Update the respective props with the newly aquired data.
        setBannerProps({
            isDisabled: false,
            type: "profile",
            name: characterData.Name,
            title: characterData.Title.Name,
            isPrefix: characterData.TitleTop,
            avatar: characterData.Avatar,  
            id: characterData.ID,
        });   
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
        setJobsProps({
            type: "jobs",
            jobs: characterData.ClassJobs
        });
        setAttributeProps({
            content: characterData.GearSet.Attributes
        });
        setQuestsProps ({
            id: characterData.ID
        });

        setIsLoading(false);
    }, []);

    return (
        isLoading ?
        <div className="loading"><img src={loadingIcon} className="icon--loading" /></div> :
        <>
            <Navbar 
            {...bannerProps} 
            search={(name, server) => window.location.href = "../?name=" + name + "&server=" + server} 
            />
            <div className="character">
                <Notice
                text={<p className="notice-text">Some XIV Tracker features may not function properly due to 
                a dependency on Achievements being set to public. You can change 
                these settings <a href="https://na.finalfantasyxiv.com/lodestone/my/setting/account/" style={{textDecoration: "underline"}}>here</a>.</p>}
                show={true}
                />
                <div className="column">
                    <Equipment {...equipmentProps} />
                    <Banner {...freeCompanyProps} />
                    <Collection id={id} />
                </div>
                <div className="column">
                    <Attributes {...attributeProps} />
                    <Jobs {...jobsProps} />
                </div>
                <Quests {...questsProps}/>
            </div>
            <Footer isHome={false}/>
        </>
    );
}

export default Character;