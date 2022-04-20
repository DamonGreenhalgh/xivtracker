import { useState, useEffect } from 'react';
import Item from './Item';
import Header from './Header';
import Loading from '../components/utility/Loading';
import Navigator from './utility/Navigator';
import './Collection.css';

const Collection = (props) => {

    const [mountPage, setMountPage] = useState(0);
    const [minionPage, setMinionPage] = useState(0);
    const [mountContent, setMountContent] = useState([]);
    const [minionContent, setMinionContent] = useState([]);
    const [maxMountPage, setMaxMountPage] = useState(0);
    const [maxMinionPage, setMaxMinionPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [numCollected, setNumCollected] = useState(0);
    const capacity = 40;

    // Will have to manually update these numbers after every major patch.
    const totalCollection = 747

    useEffect(async () => {

        let mountData, minionData;
        let storedData = localStorage.getItem("storedData");

        if (storedData == null) {
            localStorage.setItem("storedData", "{}");
        }

        storedData = JSON.parse(localStorage.getItem("storedData"));

        // Fetch character mounts and minions
        await fetch("https://xivapi.com/character/" + props.id + "?data=MIMO", {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                mountData = data.Mounts;
                minionData = data.Minions;
            });

        // Determine if we need to retrieve data from localStorage.
        if (mountData == null || minionData == null) {
            if (storedData[props.id] != null) {
                minionData = storedData[props.id].Minions;
                mountData = storedData[props.id].Mounts;
            }
        } else {
            storedData[props.id] = {"Minions": minionData, "Mounts": mountData};
            localStorage.setItem("storedData", JSON.stringify(storedData));
        }

        if (mountData !== null && minionData !== null) {

            setMaxMountPage(Math.ceil(mountData.length / capacity) - 1);
            setMaxMinionPage(Math.ceil(minionData.length / capacity) - 1);
            setNumCollected(mountData.length + minionData.length);

            setMountContent(mountContent => {
                for (let i = 0; i < Math.ceil(mountData.length / capacity); i++) {
                    mountContent.push(
                    <div className='collection' key={i}>
                        {mountData.slice(i * capacity, (i + 1) * capacity).map((mount, index) => {
                            return <Item name={mount.Name} icon={mount.Icon} key={index} />
                        })}
                    </div>
                    ); 
                }
                return mountContent;
            })

            setMinionContent(minionContent => {
                for (let i = 0; i < Math.ceil(minionData.length / capacity); i++) {
                    minionContent.push(
                    <div className='collection' key={i}>
                        {minionData.slice(i * capacity, (i + 1) * capacity).map((minion, index) => {
                            return <Item name={minion.Name} icon={minion.Icon} key={index} />
                        })}
                    </div>
                    ); 
                }
                return minionContent;   
            })
        }   
        setLoading(false);
    }, []);

    return (
        <div className="section">

            <Header 
                name="Collection" 
                minor={numCollected + " / " + totalCollection}
                major={Math.round(numCollected / totalCollection * 100) + " %"}
            />

            <div className='collection__content'>
                {
                    loading ?
                    <Loading /> :
                    <>
                        <div className='col gap-lg'>
                            {mountContent[mountPage]}
                            <Navigator 
                                update={setMountPage} 
                                current={mountPage} 
                                min={0} 
                                max={maxMountPage} 
                                style={{margin: 'auto'}}
                            />
                        </div>
                        
                        <div className='col gap-lg'>
                            {minionContent[minionPage]}
                            <Navigator 
                                update={setMinionPage} 
                                current={minionPage} 
                                min={0} 
                                max={maxMinionPage} 
                                style={{margin: 'auto'}}
                            />
                        </div>
                    </>
                }
            </div>
        </div>
    );
} 

export default Collection;