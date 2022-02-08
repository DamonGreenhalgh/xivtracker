import { useState, useEffect, useRef } from 'react';
import Item from './Item';
import Header from './Header';
import './Collection.css';

const Collection = (props) => {

    const [currentPanel, setCurrentPanel] = useState(0);

    const [mounts, setMounts] = useState(null);
    const [minions, setMinions] = useState(null);

    const [mountPage, setMountPage] = useState(1);
    const [minionPage, setMinionPage] = useState(1);

    const [maxPage, setMaxPage] = useState(null);

    const mountsContainer = useRef(null);
    const minionsContainer = useRef(null);

    const capacity = 42;

    const onClick = (event) => {
        setCurrentPanel(event.target.name);
    }

    const incrementMountPage = () => {
        if (mountPage < maxPage[0]) {
            setMountPage(mountPage + 1);
            mountsContainer.current.childNodes[mountPage - 1].className = "collection__items disabled";
            mountsContainer.current.childNodes[mountPage].className = "collection__items";
        }
        
    }

    const decrementMountPage = () => {
        if (mountPage > 1) {
            setMountPage(mountPage - 1)
            mountsContainer.current.childNodes[mountPage - 1].className = "collection__items disabled";
            mountsContainer.current.childNodes[mountPage - 2].className = "collection__items";
        }
        
    }

    const incrementMinionPage = () => {
        if (minionPage < maxPage[1]) {
            setMinionPage(minionPage + 1);
            minionsContainer.current.childNodes[minionPage - 1].className = "collection__items disabled";
            minionsContainer.current.childNodes[minionPage].className = "collection__items";
        }
        
    }

    const decrementMinionPage = () => {
        if (minionPage > 1) {
            setMinionPage(minionPage - 1)
            minionsContainer.current.childNodes[minionPage - 1].className = "collection__items disabled";
            minionsContainer.current.childNodes[minionPage - 2].className = "collection__items";
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
            setMounts(() => {
                let mountContents = [];
                for (let i = 0; i < Math.ceil(mountData.length / capacity); i++) {
                    mountContents.push(
                    <div className={"collection__items " + (mountPage == i + 1 ? "" : "disabled")} key={i}>
                        {mountData.slice(i * capacity, (i + 1) * capacity).map((mount, index) => {
                            return <Item name={mount.Name} icon={mount.Icon} key={index} />
                        })}
                    </div>
                    ); 
                }
                return mountContents;
            });

            setMinions(() => {
                let minionContents = [];
                for (let i = 0; i < Math.ceil(minionData.length / capacity); i++) {
                    minionContents.push(
                    <div className={"collection__items " + (minionPage == i + 1 ? "" : "disabled")} key={i}>
                        {minionData.slice(i * capacity, (i + 1) * capacity).map((minion, index) => {
                            return <Item name={minion.Name} icon={minion.Icon} key={index} />
                        })}
                    </div>
                    ); 
                }
                return minionContents;
            });
            
            setMaxPage([Math.ceil(mountData.length / capacity), Math.ceil(minionData.length / capacity)])    
        }
        
        
        
    }, []);

    return (
        <> 
            <div className="collection section">
                <Header name="Collection" />
                <div className="tab">
                    <button name={0} onClick={onClick} className={"tab__button " + (currentPanel == 0 ? "active" : "")}>Mounts</button>
                    <button name={1} onClick={onClick} className={"tab__button " + (currentPanel == 1 ? "active" : "")}>Minions</button>
                </div>
                <div className="panel">
                    <div className={"panel__content " + (currentPanel == 0 ? "" : "disabled")} ref={mountsContainer}>
                        {mounts}
                        <div className="collection__button-container">
                            <button className="collection__button" onClick={decrementMountPage}>{"<"}</button>
                            <h4 className="collection__page-text">{mountPage}</h4>
                            <button className="collection__button" onClick={incrementMountPage}>{">"}</button>
                        </div>
                    </div>
                    <div className={"panel__content " + (currentPanel == 1 ? "" : "disabled")} ref={minionsContainer}>
                        {minions}
                        <div className="collection__button-container">
                            <button className="collection__button" onClick={decrementMinionPage}>{"<"}</button>
                            <h4 className="collection__page-text">{minionPage}</h4>
                            <button className="collection__button" onClick={incrementMinionPage}>{">"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 

export default Collection;