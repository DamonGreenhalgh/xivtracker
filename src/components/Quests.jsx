import './Quests.css';
import meteorIcon from '../images/meteor.png';
import dungeonIcon from '../images/dungeons.png';
import trialIcon from '../images/trials.png';
import raidIcon from '../images/raids.png';
import highEndIcon from '../images/high-end-duty.png';
import msqIcon from '../images/meteor.png';
import { useEffect, useState, useRef } from 'react';
import achievementsJSON from '../data/achievements.json';
import Header from './Header';
import { FaCheck } from 'react-icons/fa';
import Navigator from './utility/Navigator';
import Divider from './utility/Divider';

const questIcon = [
    meteorIcon,
    dungeonIcon,
    trialIcon,
    raidIcon,
    highEndIcon
]

const Quests = (props) => {

    const eorzeadbBaseUrl = "https://na.finalfantasyxiv.com/lodestone/playguide/db/";
    const [panel, setPanel] = useState(0);
    const [totals, setTotals] = useState([[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]);
    const msqRef = useRef(null);
    const maxPanel = 4;

    useEffect(async () => {
        let achievementData;
        await fetch("https://xivapi.com/character/" + props.id + "?data=AC", {mode: 'cors'})
            .then(response => response.json())
            .then(data => achievementData = data.Achievements.List);
        
        // Collect all character achievement ids
        const achievementIds = []
        for (let i = 0; i < achievementData.length; i++) {
            achievementIds.push(achievementData[i].ID);
        }

        // Collect up all reference character achivement ids
        const refAchievementIds = []
        if (props.referenceCharacter !== null) {
            for (let i = 0; i < props.referenceCharacter.Achievements.List.length; i++) {
                refAchievementIds.push(props.referenceCharacter.Achievements.List[i].ID)
            }
        }

        // Determine what quests have been completed, and what to show relative 
        // to reference character.
        let completedArray = []
        for (let i = 0; i < achievementsJSON.length; i++) {
            let completed = 0;
            const ids = Object.values(achievementsJSON[i].id);
            const elements = msqRef.current.children[i].querySelectorAll('a');

            for (let j = 0; j < achievementIds.length; j++) {
                if (achievementIds.includes(ids[j])) {
                    if (refAchievementIds.includes(ids[j])) {

                        // Both reference character and character has completed quest/encounter.
                        elements[j].setAttribute('class', 'eorzeadb_link completed');
                    } else {

                        // Reference character has not completed quest/encounter, but character has.
                        elements[j].setAttribute('class', elements[j].className + ' completed');
                    }
                    // Show checkmark
                    elements[j].children[0].setAttribute('class', 'icon');
                    completed++;
                }
            }
            completedArray.push([completed, ids.length]);
        }
        setTotals(completedArray)
    }, []);

    return (
        <div className="section">

            <Header name="Quests" />
            
            <div className='completion-rate'>
                <h4>{totals[panel][0] + " / " + totals[panel][1]}</h4>
                <h3>{Math.round(totals[panel][0] / totals[panel][1] * 100)} %</h3> 
            </div>

            <div className='row gap align-center'>
                <img src={questIcon[panel]} className="icon--quests" alt={achievementsJSON[panel].name  + " Icon"} />
                <h2>{achievementsJSON[panel].name}</h2>
                <Navigator 
                    update={setPanel}
                    current={panel}
                    min={0}
                    max={maxPanel}
                    style={{marginLeft: 'auto'}}
                />
            </div>

            <div className="column" ref={msqRef}>

                {/* Main Scenario */}
                <ol className={"quests__list" + (panel==0 ? "" : " disabled")}>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">A Realm Reborn</h3>
                        <a href={eorzeadbBaseUrl + "quest/3ab32cfebf8/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />A Realm Reborn</a>
                        <a href={eorzeadbBaseUrl + "quest/defec516ba9/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />A Realm Awoken</a>
                        <a href={eorzeadbBaseUrl + "quest/7f72ebda286/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Through the Maelstrom</a>
                        <a href={eorzeadbBaseUrl + "quest/e31b1481e7a/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Defenders of Eorzea</a>
                        <a href={eorzeadbBaseUrl + "quest/48e85c94175/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Dreams of Ice</a>
                        <a href={eorzeadbBaseUrl + "quest/7be5b6453e1/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Before the Fall</a>
                    
                        <h3 className="quests__sub-header">Heavensward</h3>
                        <a href={eorzeadbBaseUrl + "quest/29fa56153f5/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Heavensward</a>
                        <a href={eorzeadbBaseUrl + "quest/02f039d7119/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />As Goes Light, So Goes Darkness</a>
                        <a href={eorzeadbBaseUrl + "quest/64c819d8eb3/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Gears of Change</a>
                        <a href={eorzeadbBaseUrl + "quest/36d55886b37/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Revenge of the Horde</a>
                        <a href={eorzeadbBaseUrl + "quest/723efddb90c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Soul Surrender</a>
                        <a href={eorzeadbBaseUrl + "quest/f024c2b6931/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Far Edge of Fate</a>
                    </div>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Stormblood</h3>
                        <a href={eorzeadbBaseUrl + "quest/08908744553/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Stormblood</a>
                        <a href={eorzeadbBaseUrl + "quest/4b032f92080/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Legend Returns</a>
                        <a href={eorzeadbBaseUrl + "quest/6ef50b6c9fe/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Rise of a New Sun</a>
                        <a href={eorzeadbBaseUrl + "quest/82318efbb39/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Under the Moonlight</a>
                        <a href={eorzeadbBaseUrl + "quest/692bc7a1186/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Prelude in Violet</a>
                        <a href={eorzeadbBaseUrl + "quest/4e3ff3ab391/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />A Requiem for Heroes</a>

                        <h3 className="quests__sub-header">Shadowbringers</h3>
                        <a href={eorzeadbBaseUrl + "quest/4ed1668d377/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Shadowbringers</a>
                        <a href={eorzeadbBaseUrl + "quest/fc70298b76f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Vows of Virtue, Deeds of Cruelty</a>
                        <a href={eorzeadbBaseUrl + "quest/b7a00665b7b/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Echoes of a Fallen Star</a>
                        <a href={eorzeadbBaseUrl + "quest/90de78eeddc/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Reflections in Crystal</a>
                        <a href={eorzeadbBaseUrl + "quest/a424070bc4c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Futures Rewritten</a>
                        <a href={eorzeadbBaseUrl + "quest/964cf0528f1/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Death Unto Dawn</a>
                    </div>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Endwalker</h3>
                        <a href={eorzeadbBaseUrl + "quest/52a65d1961d/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Endwalker</a>
                        <a href={eorzeadbBaseUrl + "quest/52a65d1961d/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />New Found Adventure</a>
                    </div>

                </ol>

                {/* Dungeons */}
                <ol className={"quests__list" + (panel==1 ? "" : " disabled")}>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">A Realm Reborn</h3>

                        <a href={eorzeadbBaseUrl + "duty/b229b89b3a8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Sastasha</a>
                        <a href={eorzeadbBaseUrl + "duty/29e71c3b0a0/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Tam-Tara Deepcroft</a>
                        <a href={eorzeadbBaseUrl + "duty/619923ac984/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Copperbell Mines</a>
                        <a href={eorzeadbBaseUrl + "duty/98319325b98/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Halatali</a>
                        <a href={eorzeadbBaseUrl + "duty/cf7612fa294/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Thousand Maws of Toto-Rak</a>
                        <a href={eorzeadbBaseUrl + "duty/e9740dde26c/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Haukke Manor</a>
                        <a href={eorzeadbBaseUrl + "duty/e371c7ab919/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Brayflox's Longstop</a>
                        <a href={eorzeadbBaseUrl + "duty/b7a48152df9/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Sunken Temple of Qarn</a>
                        <a href={eorzeadbBaseUrl + "duty/d601f85dc1e/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Cutter's Cry</a>
                        <a href={eorzeadbBaseUrl + "duty/b6491e1b508/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Stone Vigil</a>
                        <a href={eorzeadbBaseUrl + "duty/4a36cbca533/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Dzemael Darkhold</a>
                        <a href={eorzeadbBaseUrl + "duty/f507633618c/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Aurum Vale</a>
                        <a href={eorzeadbBaseUrl + "duty/59c2b3b84fa/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Castrum Meridianum<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/2407dbd0cae/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Praetorium<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/3fd66be47b2/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Wanderer's Palace</a>
                        <a href={eorzeadbBaseUrl + "duty/a8dd3748467/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Pharos Sirius</a>
                        <a href={eorzeadbBaseUrl + "duty/ae8a92122ec/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Amdapor Keep</a>
                        <a href={eorzeadbBaseUrl + "duty/a780ca9b970/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Copperbell Mines (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/61c74c68e00/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Haukke Manor (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/87d3b951d3d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Lost City of Amdapor</a>
                        <a href={eorzeadbBaseUrl + "duty/d536b8f0cc8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Halatali (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/40681f6c94a/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Brayflox's Longstop (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/18aeffad7c5/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Hullbreaker Isle</a>
                        <a href={eorzeadbBaseUrl + "duty/418628edfbf/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Stone Vigil (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/84d01fe5b6c/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Tam-Tara Deepcroft (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/6f1778eb631/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Snowcloak<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/df38ed5c808/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Sastasha (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/6b35d4a1179/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Sunken Temple of Qarn (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/5e75d2059af/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Keeper of the Lake<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/7c11b0ba080/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Wanderer's Palace (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/a4288ecf826/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Amdapor Keep (Hard)</a>
                    </div>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Heavensward</h3>

                        <a href={eorzeadbBaseUrl + "duty/eed0add7a62/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Sohm Al<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/df5ab8bfd61/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Dusk Vigil</a>
                        <a href={eorzeadbBaseUrl + "duty/339c4923556/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Aery<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/a62f7ee3718/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Vault<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/f368b40c648/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Great Gubal Library<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/923e0a1d1d0/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Aetherochemical Research Facility<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/618168354ea/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Neverreap</a>
                        <a href={eorzeadbBaseUrl + "duty/c39cf50a6a5/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Fractal Continuum</a>
                        <a href={eorzeadbBaseUrl + "duty/cdad1cb65e8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Saint Mocianne's Arboretum</a>
                        <a href={eorzeadbBaseUrl + "duty/cd500c08682/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Pharos Sirius (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/36e172ff46c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Antitower<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/193a96b0fa4/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Lost City of Amdapor (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/a8c7c5c13bd/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Sohr Khai<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/313b1415d0f/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Hullbreaker Isle (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/1d95a773990/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Xelphatol<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/d6e98e35e6f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Great Gubal Library (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/bc72ef27ade/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Baelsar's Wall<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/9bd9004a140/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Sohm Al (Hard)</a>

                        <h3 className="quests__sub-header">Stormblood</h3>

                        <a href={eorzeadbBaseUrl + "duty/471227e1ee7/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Sirensong Sea<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/39ba54ada1c/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Shisui of the Violet Tides</a>
                        <a href={eorzeadbBaseUrl + "duty/53d7100d839/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Bardam's Mettle<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/cd924bd8eac/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Doma Castle<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/e635797754f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Castrum Abania<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/c71bb06e67b/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Ala Mhigo<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/37d0e83919d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Kugane Castle</a>
                        <a href={eorzeadbBaseUrl + "duty/23edcb0d626/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Temple of the Fist</a>
                        <a href={eorzeadbBaseUrl + "duty/47ef709fb04/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Drowned City of Skalla<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/f9ab5899e9d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Hells' Lid</a>
                        <a href={eorzeadbBaseUrl + "duty/b8bea03880d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Fractal Continuum (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/35ed52cf463/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Swallow's Compass</a>
                        <a href={eorzeadbBaseUrl + "duty/c8608c977a6/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Burn<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/25cf070eeb4/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Saint Mocianne's Arboretum (Hard)</a>
                        <a href={eorzeadbBaseUrl + "duty/33a05f144e4/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Ghimlyt Dark<img src={msqIcon} className="icon--msq" alt="" /></a>

                    </div>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Shadowbringers</h3>

                        <a href={eorzeadbBaseUrl + "duty/a6165958a5c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Holminster Switch<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/5f9f024b774/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Dohn Mheg<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/3aff2d6760c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Qitana Ravel<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/f8fff809d77/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Malikah's Well<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/72f2e86daba/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Mt. Gulg<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/c5de427bfef/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Amaurot<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/be6a14f45a6/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Twinning</a>
                        <a href={eorzeadbBaseUrl + "duty/d2b053e4e31/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Akadaemia Anyder</a>
                        <a href={eorzeadbBaseUrl + "duty/1f246825352/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Grand Cosmos<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/969e6501eb7/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Anamnesis Anyder<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/44073b7449c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Heroes' Gauntlet<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/5a30eb6b20d/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Matoya's Relict<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/81f08141768/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Paglth'an<img src={msqIcon} className="icon--msq" alt="" /></a>

                        <h3 className="quests__sub-header">Endwalker</h3>

                        <a href={eorzeadbBaseUrl + "duty/9c317b74e3a/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Tower of Zot<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/3297718033f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Tower of Babil<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/dadcd891cc1/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Vanaspati<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/8514a64c969/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Ktisis Hyperboreia<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/fd65b266f55/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Aitiascope<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/ba59c193b71/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Dead Ends<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/175e6a7245d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Smileton</a>
                        <a href={eorzeadbBaseUrl + "duty/25f8ec27427/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Stigma Dreamscape</a>
                        <a href={eorzeadbBaseUrl + "duty/d56ff366a07"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Alzadaal's Legacy</a>
                    </div>
                </ol>

                {/* Trials */}
                <ol className={"quests__list" + (panel==2 ? "" : " disabled")}>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Realm Reborn</h3>

                        <a href={eorzeadbBaseUrl + "duty/6af1a94ccca/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Bowl of Embers<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/589c727302e/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Navel<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/7c17ae70cc6/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Howling Eye<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/b7c47c44490/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Thornmarch<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/0850a8627aa/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Whorleater<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/4d8cae741db/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Striking Tree<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/5f786d57228/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Akh Afah Amphitheatre<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/21d8c5bd54b/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Urth's Fount</a>
                    
                        <h3 className="quests__sub-header">Heavensward</h3>

                        <a href={eorzeadbBaseUrl + "duty/83f028575c8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Thok ast Thok<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/e9bb63551a4/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Limitless Blue<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/a8a4860068c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Thordan's Reign<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/e05c982993d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Containment Bay S1T7</a>
                        <a href={eorzeadbBaseUrl + "duty/0e880006330/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Nidhogg's Rage<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/212ceb19a34/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Containment Bay P1T6</a>
                        <a href={eorzeadbBaseUrl + "duty/26a86785be9/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Containment Bay Z1T9</a>

                    </div>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Stormblood</h3>

                        <a href={eorzeadbBaseUrl + "duty/b28f61e6212/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Pool of Tribute<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/7de6a27d145/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Emanation<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/8c829b8dd8c/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Shinryu's Domain<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/44fc4abc0eb/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Jade Stoa</a>
                        <a href={eorzeadbBaseUrl + "duty/0919d2674e0/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Tsukuyomi's Pain<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/52328939737/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Great Hunt</a>
                        <a href={eorzeadbBaseUrl + "duty/628e9a05d34/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Hells' Kier</a>
                        <a href={eorzeadbBaseUrl + "duty/c79d50c803d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Wreath of Snakes</a>
                    
                        <h3 className="quests__sub-header">Shadowbringers</h3>

                        <a href={eorzeadbBaseUrl + "duty/bad53f19540/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Dancing Plague<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/55504d0495f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Crown of the Immaculate<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/b2e08d16bce/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Hades's Elegy<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/b388be5eb05/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Cinder Drift</a>
                        <a href={eorzeadbBaseUrl + "duty/1543e03ff37/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />The Seat of Sacrifice<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/841d3f69efd/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Memoria Misera</a>
                        <a href={eorzeadbBaseUrl + "duty/16e9780d10e/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Castrum Marinum</a>
                        <a href={eorzeadbBaseUrl + "duty/c4a2acf0912/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Cloud Deck</a>
                    </div>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Endwalker</h3>

                        <a href={eorzeadbBaseUrl + "duty/f40a8f14d6d/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Zodiark's Fall<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/0dbba05fd0f/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Hydaelyn's Call<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/0c90d0fd67b/"} className="eorzeadb_link spoiler"><FaCheck className="icon hidden" />Endsinger Aria<img src={msqIcon} className="icon--msq" alt="" /></a>
                    </div>
                </ol>

                {/* Raids */}
                <ol className={"quests__list" + (panel==3 ? "" : " disabled")}>

                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Bahamut</h3>

                        <a href={eorzeadbBaseUrl + "duty/7134211f501/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Binding Coil of Bahamut</a>
                        <a href={eorzeadbBaseUrl + "duty/1fed5f286f0/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Second Coil of Bahamut</a>
                        <a href={eorzeadbBaseUrl + "duty/f086f0517d0/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Final Coil of Bahamut</a>

                        <h3 className="quests__sub-header">Alexander</h3>

                        <a href={eorzeadbBaseUrl + "duty/0e9dbcd3e88/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: Gordias</a>
                        <a href={eorzeadbBaseUrl + "duty/d3146ecb9f8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: Midas</a>
                        <a href={eorzeadbBaseUrl + "duty/5516e8fd14f/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: The Creator</a>

                        <h3 className="quests__sub-header">Omega</h3>

                        <a href={eorzeadbBaseUrl + "duty/76f228004f2/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Deltascape</a>
                        <a href={eorzeadbBaseUrl + "duty/f6bdf734a4a/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Sigmascape</a>
                        <a href={eorzeadbBaseUrl + "duty/6164ec419fe/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Alphascape</a>
                        
                        <h3 className="quests__sub-header">Eden</h3>

                        <a href={eorzeadbBaseUrl + "duty/b2a4cb98763/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Gate</a>
                        <a href={eorzeadbBaseUrl + "duty/2024c23c039/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Verse</a>
                        <a href={eorzeadbBaseUrl + "duty/d53631d5202/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Promise</a>

                        <h3 className="quests__sub-header">Pandæmonium</h3>

                        <a href={eorzeadbBaseUrl + "duty/8766feb6d35/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Asphodelos</a>
                    </div>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Crystal Tower</h3>

                        <a href={eorzeadbBaseUrl + "duty/d9f4e986d0e/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Labyrinth of the Ancients<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/47eb1d018b6/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Syrcus Tower<img src={msqIcon} className="icon--msq" alt="" /></a>
                        <a href={eorzeadbBaseUrl + "duty/7f0a3551ab6/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The World of Darkness<img src={msqIcon} className="icon--msq" alt="" /></a>

                        <h3 className="quests__sub-header">Shadow of Mhach</h3>

                        <a href={eorzeadbBaseUrl + "duty/07fc9cb5bc8/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Void Ark</a>
                        <a href={eorzeadbBaseUrl + "duty/b0a1515fd3d/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Weeping City of Mhach</a>
                        <a href={eorzeadbBaseUrl + "duty/35a8825ed8e/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Dun Scaith</a>

                        <h3 className="quests__sub-header">Return to Ivalice</h3>

                        <a href={eorzeadbBaseUrl + "duty/56209386296/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Royal City of Rabanastre</a>
                        <a href={eorzeadbBaseUrl + "duty/390fb10fd68/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Ridorana Lighthouse</a>
                        <a href={eorzeadbBaseUrl + "duty/95dbcc947db/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Orbonne Monastery</a>

                        <h3 className="quests__sub-header">YoRHa: Dark Apocalypse</h3>

                        <a href={eorzeadbBaseUrl + "duty/ed86e5291b2/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Copied Factory</a>
                        <a href={eorzeadbBaseUrl + "duty/889b8d8cfa4/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Puppets' Bunker</a>
                        <a href={eorzeadbBaseUrl + "duty/f1a29897772/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Tower at Paradigm's Breach</a>

                        <h3 className="quests__sub-header">Myths of the Realm</h3>

                        <a href={eorzeadbBaseUrl + "duty/f1a29897772/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Aglaia</a>


                    </div>
                    <div className='quests__column'></div>
                </ol>  

                {/* High End */}
                <ol className={"quests__list" + (panel==4 ? "" : " disabled")}>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Savage</h3>

                        <a href={eorzeadbBaseUrl + "duty/0065196fbe4/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Second Coil of Bahamut</a>

                        <a href={eorzeadbBaseUrl + "duty/fd7aa157f29/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: Gordias</a>
                        <a href={eorzeadbBaseUrl + "duty/f93d68d7d3c/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: Midas</a>
                        <a href={eorzeadbBaseUrl + "duty/def61a894af/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Alexander: The Creator</a>

                        <a href={eorzeadbBaseUrl + "duty/0b519d7fd00/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Deltascape</a>
                        <a href={eorzeadbBaseUrl + "duty/28d9a03c886/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Sigmascape</a>
                        <a href={eorzeadbBaseUrl + "duty/33360b27f26/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Omega: Alphascape</a>

                        <a href={eorzeadbBaseUrl + "duty/3f2c9ddbe05/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Gate</a>
                        <a href={eorzeadbBaseUrl + "duty/46c4d21a738/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Verse</a>
                        <a href={eorzeadbBaseUrl + "duty/6a038f0d5ef/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Eden's Promise</a>

                        <a href={eorzeadbBaseUrl + "duty/6a038f0d5ef/"} className="eorzeadb_link"><FaCheck className="icon hidden" />Asphodelos</a>
                    </div>
                    <div className='quests__column'>
                        <h3 className="quests__sub-header">Ultimate</h3>

                        <a href={eorzeadbBaseUrl + "duty/1a863f1ea3b/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Unending Coil of Bahamut</a>
                        <a href={eorzeadbBaseUrl + "duty/e6c2c586ba6/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Weapon's Refrain</a>
                        <a href={eorzeadbBaseUrl + "duty/b56710190e9/"} className="eorzeadb_link"><FaCheck className="icon hidden" />The Epic of Alexander</a>
                    </div>
                    <div className='quests__column'></div>
                </ol>

            </div>
        </div>
    );
}

export default Quests;