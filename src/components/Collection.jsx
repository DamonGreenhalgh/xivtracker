import { useState, useEffect } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Item from './Item';
import Header from './Header';
import Button from '../components/utility/Button';
import Loading from '../components/utility/Loading';
import './Collection.css';

const Collection = (props) => {

    const [displayMountMinion, setDisplayMountMinion] = useState(true);
    const [mountPage, setMountPage] = useState(0);
    const [minionPage, setMinionPage] = useState(0);
    const [mountContent, setMountContent] = useState([]);
    const [minionContent, setMinionContent] = useState([]);
    const [maxMountPage, setMaxMountPage] = useState(0);
    const [maxMinionPage, setMaxMinionPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const capacity = 48;

    const clamp = (min, max, value) => {
        return Math.max(min, Math.min(value, max));
    }

    const updatePage = (direction) => {
        if (displayMountMinion) {
            setMountPage(mountPage => clamp(0, maxMountPage - 1, mountPage + direction));
        } else {
            setMinionPage(minionPage => clamp(0, maxMinionPage - 1, minionPage + direction));
        }
    }

    useEffect(async () => {

        let mountData, minionData;
        let storedData = localStorage.getItem("storedData");

        if (storedData == null) {
            localStorage.setItem("storedData", "{}");
        }

        storedData = JSON.parse(localStorage.getItem("storedData"));

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

            setMaxMountPage(() => Math.ceil(mountData.length / capacity));
            setMaxMinionPage(() => Math.ceil(minionData.length / capacity));

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
            <Header name="Collection" />
            <div className="row gap-lg">
                <Button 
                    content="Mounts" 
                    condition={displayMountMinion} 
                    onClick={() => setDisplayMountMinion(true)}
                />
                <Button 
                    content="Minions" 
                    condition={!displayMountMinion} 
                    onClick={() => setDisplayMountMinion(false)}
                />
            </div>
            <div className="row align-center justify-center gap-lg">
                <button onClick={() => updatePage(-1)}><FaChevronLeft /></button>
                <h4>{1 + (displayMountMinion ? mountPage : minionPage)}</h4>
                <button onClick={() => updatePage(1)}><FaChevronRight /></button>
            </div>
            {
                loading ?
                <Loading /> :
                <>
                    <div className={displayMountMinion ? "" : "disabled"}>
                        {mountContent[mountPage]}
                    </div>
                    <div className={displayMountMinion ? "disabled" : ""}>
                        {minionContent[minionPage]}
                    </div>
                </>
            }            
        </div>
    );
} 

export default Collection;