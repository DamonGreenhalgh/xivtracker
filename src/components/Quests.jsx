import './Quests.css';
import meteorIcon from '../images/meteor.png';
import dungeonIcon from '../images/dungeons.png';
import trialIcon from '../images/trials.png';
import raidIcon from '../images/raids.png';
import highEndIcon from '../images/high-end-duty.png';
import checkmarkIcon from '../images/checkmark.svg';
import msqIcon from '../images/msq.svg';
import { useEffect, useRef, useState } from 'react';
import referenceData from '../reference.json';
import Header from './Header';


const Quests = (props) => {

    const msqList = useRef(null);
    const dungeonsList = useRef(null);
    const trialsList = useRef(null);
    const raidsList = useRef(null);
    const highendList = useRef(null);

    const [msqCompletion, setMsqCompletion] = useState("-/-");
    const [dungeonsCompletion, setDungeonsCompletion] = useState("-/-");
    const [trialsCompletion, setTrialsCompletion] = useState("-/-");
    const [raidsCompletion, setRaidsCompletion] = useState("-/-");
    const [highendCompletion, setHighendCompletion] = useState("-/-");

    const [isLoading, setIsLoading] = useState(true);

    const eorzeadbBaseUrl = "https://na.finalfantasyxiv.com/lodestone/playguide/db/";

    useEffect(async () => {

        let achievementData = [];
        await fetch("https://xivapi.com/character/" + props.id + "?data=AC", {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                // Parse response for achievements id's 
               for (let i = 0; i < data.Achievements.List.length; i++) {
                    achievementData.push(data.Achievements.List[i].ID);
               }
            });

        const msqReferences = Object.values(referenceData.msq);
        const dungeonReferences = Object.values(referenceData.dungeons);
        const trialsReferences = Object.values(referenceData.trials);
        const raidsReferences = Object.values(referenceData.raids);
        const highendReferences = Object.values(referenceData.highend);

        const data = [
            [msqList, msqReferences, setMsqCompletion],
            [dungeonsList, dungeonReferences, setDungeonsCompletion],
            [trialsList, trialsReferences, setTrialsCompletion],
            [raidsList, raidsReferences, setRaidsCompletion],
            [highendList, highendReferences, setHighendCompletion]
        ];
        
        let list, reference, completed;

        // Iterate over each quest/encounter, determine if the character has 
        // completed that activity. Display check and filter to green if so.
        for (let i = 0; i < data.length; i++) {

            // 'completed' counts the number of completed quests/encounters for
            // that section.
            completed = 0;

            list = data[i][0].current.getElementsByTagName('li');
            reference = data[i][1];
            for (let j = 0; j < reference.length; j++) {

                // If the quest/encounter has been completed, update.
                if (achievementData.includes(reference[j])) {
                    list[j].childNodes[0].className = "icon";
                    list[j].className += " completed";

                    // Increment
                    completed++;
                }
            }
            data[i][2](completed + "/" + reference.length);
        }
        setIsLoading(false);
    }, []);

    return (
        <>
            <div className="quests section">
                <Header name="Quests" isSpan={true} />
                <div className={"panel panel--quests" + (isLoading ? " blur" : "")}>
                    <div className="quests__column">

                        {/* Main Scenario */}
                        <div className="quests__header">
                            <img src={meteorIcon} className="icon--quests" alt="Main Quests Icon" />
                            <h2>Main Scenario</h2>
                            <p className="completed">{msqCompletion}</p>
                        </div>

                        <ol className="quests__list" ref={msqList}>

                            <li className="quests__sub-header"><a href={eorzeadbBaseUrl + "quest/3ab32cfebf8/"} className="eorzeadb_link">A Realm Reborn</a></li>
                            
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/defec516ba9/"} className="eorzeadb_link">A Realm Awoken</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/7f72ebda286/"} className="eorzeadb_link">Through the Maelstrom</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/e31b1481e7a/"} className="eorzeadb_link">Defenders of Eorzea</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/48e85c94175/"} className="eorzeadb_link">Dreams of Ice</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/7be5b6453e1/"} className="eorzeadb_link">Before the Fall</a></li>

                            <li className="quests__sub-header"><a href={eorzeadbBaseUrl + "quest/29fa56153f5/"} className="eorzeadb_link">Heavensward</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/02f039d7119/"} className="eorzeadb_link">As Goes Light, So Goes Darkness</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/64c819d8eb3/"} className="eorzeadb_link">The Gears of Change</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/36d55886b37/"} className="eorzeadb_link">Revenge of the Horde</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/723efddb90c/"} className="eorzeadb_link">Soul Surrender</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/f024c2b6931/"} className="eorzeadb_link">The Far Edge of Fate</a></li>

                            <li className="quests__sub-header"><a href={eorzeadbBaseUrl + "quest/08908744553/"} className="eorzeadb_link">Stormblood</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/4b032f92080/"} className="eorzeadb_link">The Legend Returns</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/6ef50b6c9fe/"} className="eorzeadb_link">Rise of a New Sun</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/82318efbb39/"} className="eorzeadb_link">Under the Moonlight</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/692bc7a1186/"} className="eorzeadb_link">Prelude in Violet</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/4e3ff3ab391/"} className="eorzeadb_link">A Requiem for Heroes</a></li>

                            <li className="quests__sub-header"><a href={eorzeadbBaseUrl + "quest/4ed1668d377/"} className="eorzeadb_link">Shadowbringers</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/fc70298b76f/"} className="eorzeadb_link">Vows of Virtue, Deeds of Cruelty</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/b7a00665b7b/"} className="eorzeadb_link">Echoes of a Fallen Star</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/90de78eeddc/"} className="eorzeadb_link">Reflections in Crystal</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/a424070bc4c/"} className="eorzeadb_link">Futures Rewritten</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "quest/964cf0528f1/"} className="eorzeadb_link">Death Unto Dawn</a></li>

                            <li className="quests__sub-header"><a href={eorzeadbBaseUrl + "quest/52a65d1961d/"} className="eorzeadb_link">Endwalker</a></li>
                        
                        </ol>

                        {/* Raids */}
                        <div className="quests__header">
                            <img src={raidIcon} className="icon--quests" alt="Raids Icon" />
                            <h2>Raids</h2>
                            <p className="completed">{raidsCompletion}</p>
                        </div>

                        <ol className="quests__list" ref={raidsList}>

                            <h3 className="quests__sub-header">Bahamut</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7134211f501/"} className="eorzeadb_link">The Binding Coil of Bahamut</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/1fed5f286f0/"} className="eorzeadb_link">The Second Coil of Bahamut</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f086f0517d0/"} className="eorzeadb_link">The Final Coil of Bahamut</a></li>

                            <h3 className="quests__sub-header">Alexander</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0e9dbcd3e88/"} className="eorzeadb_link">Alexander: Gordias</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d3146ecb9f8/"} className="eorzeadb_link">Alexander: Midas</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/5516e8fd14f/"} className="eorzeadb_link">Alexander: The Creator</a></li>

                            <h3 className="quests__sub-header">Omega</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/76f228004f2/"} className="eorzeadb_link">Omega: Deltascape</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f6bdf734a4a/"} className="eorzeadb_link">Omega: Sigmascape</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/6164ec419fe/"} className="eorzeadb_link">Omega: Alphascape</a></li>

                            <h3 className="quests__sub-header">Eden</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b2a4cb98763/"} className="eorzeadb_link">Eden's Gate</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/2024c23c039/"} className="eorzeadb_link">Eden's Verse</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d53631d5202/"} className="eorzeadb_link">Eden's Promise</a></li>

                            <h3 className="quests__sub-header">Pandæmonium</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" />Asphodelos</li>

                            <h3 className="quests__sub-header">Crystal Tower</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d9f4e986d0e/"} className="eorzeadb_link">The Labyrinth of the Ancients</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/47eb1d018b6/"} className="eorzeadb_link">Syrcus Tower</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7f0a3551ab6/"} className="eorzeadb_link">The World of Darkness</a><img src={msqIcon} className="icon--msq" alt="" /></li>

                            <h3 className="quests__sub-header">Shadow of Mhach</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/07fc9cb5bc8/"} className="eorzeadb_link">The Void Ark</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b0a1515fd3d/"} className="eorzeadb_link">The Weeping City of Mhach</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/35a8825ed8e/"} className="eorzeadb_link">Dun Scaith</a></li>

                            <h3 className="quests__sub-header">Return to Ivalice</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/56209386296/"} className="eorzeadb_link">The Royal City of Rabanastre</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/390fb10fd68/"} className="eorzeadb_link">The Ridorana Lighthouse</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/95dbcc947db/"} className="eorzeadb_link">The Orbonne Monastery</a></li>

                            <h3 className="quests__sub-header">YoRHa: Dark Apocalypse</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/ed86e5291b2/"} className="eorzeadb_link">The Copied Factory</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/889b8d8cfa4/"} className="eorzeadb_link">The Puppets' Bunker</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f1a29897772/"} className="eorzeadb_link">The Tower at Paradigm's Breach</a></li>

                        </ol>                   

                    </div>

                    <div className="quests__column">

                        {/* Dungeons */}
                        <div className="quests__header">
                            <img src={dungeonIcon} className="icon--quests" alt="Dungeons Icon" />
                            <h2>Dungeons</h2>
                            <p className="completed">{dungeonsCompletion}</p>
                        </div>

                        <ol className="quests__list" ref={dungeonsList}>

                            <h3 className="quests__sub-header">A Realm Reborn</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b229b89b3a8/"} className="eorzeadb_link">Sastasha</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/29e71c3b0a0/"} className="eorzeadb_link">The Tam-Tara Deepcroft</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/619923ac984/"} className="eorzeadb_link">Copperbell Mines</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/98319325b98/"} className="eorzeadb_link">Halatali</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/cf7612fa294/"} className="eorzeadb_link">The Thousand Maws of Toto-Rak</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e9740dde26c/"} className="eorzeadb_link">Haukke Manor</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e371c7ab919/"} className="eorzeadb_link">Brayflox's Longstop</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b7a48152df9/"} className="eorzeadb_link">The Sunken Temple of Qarn</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d601f85dc1e/"} className="eorzeadb_link">Cutter's Cry</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b6491e1b508/"} className="eorzeadb_link">The Stone Vigil</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/4a36cbca533/"} className="eorzeadb_link">Dzemael Darkhold</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f507633618c/"} className="eorzeadb_link">The Aurum Vale</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/59c2b3b84fa/"} className="eorzeadb_link">Castrum Meridianum</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/2407dbd0cae/"} className="eorzeadb_link">The Praetorium</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/3fd66be47b2/"} className="eorzeadb_link">The Wanderer's Palace</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a8dd3748467/"} className="eorzeadb_link">Pharos Sirius</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/ae8a92122ec/"} className="eorzeadb_link">Amdapor Keep</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a780ca9b970/"} className="eorzeadb_link">Copperbell Mines (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/61c74c68e00/"} className="eorzeadb_link">Haukke Manor (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/87d3b951d3d/"} className="eorzeadb_link">The Lost City of Amdapor</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d536b8f0cc8/"} className="eorzeadb_link">Halatali (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/40681f6c94a/"} className="eorzeadb_link">Brayflox's Longstop (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/18aeffad7c5/"} className="eorzeadb_link">Hullbreaker Isle</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/418628edfbf/"} className="eorzeadb_link">The Stone Vigil (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/84d01fe5b6c/"} className="eorzeadb_link">The Tam-Tara Deepcroft (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/6f1778eb631/"} className="eorzeadb_link">Snowcloak</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/df38ed5c808/"} className="eorzeadb_link">Sastasha (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/6b35d4a1179/"} className="eorzeadb_link">The Sunken Temple of Qarn (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/5e75d2059af/"} className="eorzeadb_link">The Keeper of the Lake</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7c11b0ba080/"} className="eorzeadb_link">The Wanderer's Palace (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a4288ecf826/"} className="eorzeadb_link">Amdapor Keep (Hard)</a></li>

                            <h3 className="quests__sub-header">Heavensward</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/eed0add7a62/"} className="eorzeadb_link">Sohm Al</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/df5ab8bfd61/"} className="eorzeadb_link">The Dusk Vigil</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/339c4923556/"} className="eorzeadb_link">The Aery</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a62f7ee3718/"} className="eorzeadb_link">The Vault</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f368b40c648/"} className="eorzeadb_link">The Great Gubal Library</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/923e0a1d1d0/"} className="eorzeadb_link">The Aetherochemical Research Facility</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/618168354ea/"} className="eorzeadb_link">Neverreap</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c39cf50a6a5/"} className="eorzeadb_link">The Fractal Continuum</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/cdad1cb65e8/"} className="eorzeadb_link">Saint Mocianne's Arboretum</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/cd500c08682/"} className="eorzeadb_link">Pharos Sirius (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/36e172ff46c/"} className="eorzeadb_link">The Antitower</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/193a96b0fa4/"} className="eorzeadb_link">The Lost City of Amdapor (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a8c7c5c13bd/"} className="eorzeadb_link">Sohr Khai</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/313b1415d0f/"} className="eorzeadb_link">Hullbreaker Isle (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/1d95a773990/"} className="eorzeadb_link">Xelphatol</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d6e98e35e6f/"} className="eorzeadb_link">The Great Gubal Library (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/bc72ef27ade/"} className="eorzeadb_link">Baelsar's Wall</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/9bd9004a140/"} className="eorzeadb_link">Sohm Al (Hard)</a></li>

                            <h3 className="quests__sub-header">Stormblood</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/471227e1ee7/"} className="eorzeadb_link">The Sirensong Sea</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/39ba54ada1c/"} className="eorzeadb_link">Shisui of the Violet Tides</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/53d7100d839/"} className="eorzeadb_link">Bardam's Mettle</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/cd924bd8eac/"} className="eorzeadb_link">Doma Castle</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e635797754f/"} className="eorzeadb_link">Castrum Abania</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c71bb06e67b/"} className="eorzeadb_link">Ala Mhigo</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/37d0e83919d/"} className="eorzeadb_link">Kugane Castle</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/23edcb0d626/"} className="eorzeadb_link">The Temple of the Fist</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/47ef709fb04/"} className="eorzeadb_link">The Drowned City of Skalla</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f9ab5899e9d/"} className="eorzeadb_link">Hells' Lid</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b8bea03880d/"} className="eorzeadb_link">The Fractal Continuum (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/35ed52cf463/"} className="eorzeadb_link">The Swallow's Compass</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c8608c977a6/"} className="eorzeadb_link">The Burn</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/25cf070eeb4/"} className="eorzeadb_link">Saint Mocianne's Arboretum (Hard)</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/33a05f144e4/"} className="eorzeadb_link">The Ghimlyt Dark</a><img src={msqIcon} className="icon--msq" alt="" /></li>

                            <h3 className="quests__sub-header">Shadowbringers</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a6165958a5c/"} className="eorzeadb_link">Holminster Switch</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/5f9f024b774/"} className="eorzeadb_link">Dohn Mheg</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/3aff2d6760c/"} className="eorzeadb_link">The Qitana Ravel</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f8fff809d77/"} className="eorzeadb_link">Malikah's Well</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/72f2e86daba/"} className="eorzeadb_link">Mt. Gulg</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c5de427bfef/"} className="eorzeadb_link">Amaurot</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/be6a14f45a6/"} className="eorzeadb_link">The Twinning</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/d2b053e4e31/"} className="eorzeadb_link">Akadaemia Anyder</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/1f246825352/"} className="eorzeadb_link">The Grand Cosmos</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/969e6501eb7/"} className="eorzeadb_link">Anamnesis Anyder</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/44073b7449c/"} className="eorzeadb_link">The Heroes' Gauntlet</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/5a30eb6b20d/"} className="eorzeadb_link">Matoya's Relict</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/81f08141768/"} className="eorzeadb_link">Paglth'an</a><img src={msqIcon} className="icon--msq" alt="" /></li>

                            <h3 className="quests__sub-header">Endwalker</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/9c317b74e3a/"} className="eorzeadb_link">The Tower of Zot</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/3297718033f/"} className="eorzeadb_link">The Tower of Babil</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/dadcd891cc1/"} className="eorzeadb_link">Vanaspati</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/8514a64c969/"} className="eorzeadb_link">Ktisis Hyperboreia</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/fd65b266f55/"} className="eorzeadb_link">The Aitiascope</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/ba59c193b71/"} className="eorzeadb_link">The Dead Ends</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/175e6a7245d/"} className="eorzeadb_link">Smileton</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/25f8ec27427/"} className="eorzeadb_link">The Stigma Dreamscape</a></li>
                        </ol>
                    </div>
                    
                    <div className="quests__column">

                        {/* Trials */}
                        <div className="quests__header">
                            <img src={trialIcon} className="icon--quests" alt="Trials Icon" />
                            <h2>Trials</h2>
                            <p className="completed">{trialsCompletion}</p>
                        </div>

                        <ol className="quests__list" ref={trialsList}>
                            <h3 className="quests__sub-header">Realm Reborn</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/6af1a94ccca/"} className="eorzeadb_link">The Bowl of Embers</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/589c727302e/"} className="eorzeadb_link">The Navel</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7c17ae70cc6/"} className="eorzeadb_link">The Howling Eye</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b7c47c44490/"} className="eorzeadb_link">Thornmarch</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0850a8627aa/"} className="eorzeadb_link">The Whorleater</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/4d8cae741db/"} className="eorzeadb_link">The Striking Tree</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/5f786d57228/"} className="eorzeadb_link">The Akh Afah Amphitheatre</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/2fac3746c16/"} className="eorzeadb_link">The Chrysalis</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f80af21461f/"} className="eorzeadb_link">The Steps of Faith</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/cb876745bce/"} className="eorzeadb_link">Battle in the Big Keep</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/21d8c5bd54b/"} className="eorzeadb_link">Urth's Fount</a></li>
                        
                            <h3 className="quests__sub-header">Heavensward</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/83f028575c8/"} className="eorzeadb_link">Thok ast Thok</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e9bb63551a4/"} className="eorzeadb_link">The Limitless Blue</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/a8a4860068c/"} className="eorzeadb_link">Thordan's Reign</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e05c982993d/"} className="eorzeadb_link">Containment Bay S1T7</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0e880006330/"} className="eorzeadb_link">Nidhogg's Rage</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/212ceb19a34/"} className="eorzeadb_link">Containment Bay P1T6</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/26a86785be9/"} className="eorzeadb_link">Containment Bay Z1T9</a></li>

                            <h3 className="quests__sub-header">Stormblood</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b28f61e6212/"} className="eorzeadb_link">The Pool of Tribute</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7de6a27d145/"} className="eorzeadb_link">Emanation</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/8c829b8dd8c/"} className="eorzeadb_link">Shinryu's Domain</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/44fc4abc0eb/"} className="eorzeadb_link">The Jade Stoa</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0919d2674e0/"} className="eorzeadb_link">Tsukuyomi's Pain</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/52328939737/"} className="eorzeadb_link">The Great Hunt</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/628e9a05d34/"} className="eorzeadb_link">Hells' Kier</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c79d50c803d/"} className="eorzeadb_link">The Wreath of Snakes</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/bad56c435a5/"} className="eorzeadb_link">Kugane Ohashi</a></li>

                            <h3 className="quests__sub-header">Shadowbringers</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/bad53f19540/"} className="eorzeadb_link">The Dancing Plague</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/55504d0495f/"} className="eorzeadb_link">The Crown of the Immaculate</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b2e08d16bce/"} className="eorzeadb_link">Hades's Elegy</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b388be5eb05/"} className="eorzeadb_link">Cinder Drift</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/1543e03ff37/"} className="eorzeadb_link">The Seat of Sacrifice</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/841d3f69efd/"} className="eorzeadb_link">Memoria Misera</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/16e9780d10e/"} className="eorzeadb_link">Castrum Marinum</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/c4a2acf0912/"} className="eorzeadb_link">The Cloud Deck</a></li>

                            <h3 className="quests__sub-header">Endwalker</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f40a8f14d6d/"} className="eorzeadb_link">Zodiark's Fall</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0dbba05fd0f/"} className="eorzeadb_link">Hydaelyn's Call</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/7b4070f67f6/"} className="eorzeadb_link">The Final Day</a><img src={msqIcon} className="icon--msq" alt="" /></li>
                        </ol>

                        {/* High End */}
                        <div className="quests__header">
                            <img src={highEndIcon} className="icon--quests" alt="High End Icon" />
                            <h2>High End</h2>
                            <p className="completed">{highendCompletion}</p>
                        </div>

                        <ol className="quests__list" ref={highendList}>

                            <h3 className="quests__sub-header">Savage</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0065196fbe4/"} className="eorzeadb_link">The Second Coil of Bahamut</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/fd7aa157f29/"} className="eorzeadb_link">Alexander: Gordias</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/f93d68d7d3c/"} className="eorzeadb_link">Alexander: Midas</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/def61a894af/"} className="eorzeadb_link">Alexander: The Creator</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/0b519d7fd00/"} className="eorzeadb_link">Omega: Deltascape</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/28d9a03c886/"} className="eorzeadb_link">Omega: Sigmascape</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/33360b27f26/"} className="eorzeadb_link">Omega: Alphascape</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/3f2c9ddbe05/"} className="eorzeadb_link">Eden's Gate</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/46c4d21a738/"} className="eorzeadb_link">Eden's Verse</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/6a038f0d5ef/"} className="eorzeadb_link">Eden's Promise</a></li>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" />Asphodelos</li>

                            <h3 className="quests__sub-header">Ultimate</h3>

                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/1a863f1ea3b/"} className="eorzeadb_link">The Unending Coil of Bahamut</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/e6c2c586ba6/"} className="eorzeadb_link">The Weapon's Refrain</a></li>
                            <li><img src={checkmarkIcon} className="icon hidden" alt="" /><a href={eorzeadbBaseUrl + "duty/b56710190e9/"} className="eorzeadb_link">The Epic of Alexander</a></li>

                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Quests;