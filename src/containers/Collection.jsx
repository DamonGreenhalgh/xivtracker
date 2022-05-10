// Hooks
import { useState, useEffect } from 'react';
import { useFetchData } from '../hooks/useFetchData';

// Components
import Item from '../components/Item';
import Header from '../components/Header';
import Navigator from '../components/Navigator';

// Style
import '../styles/Collection.css';

/**
 * @name Collection
 * @description Collection container for mount and minion items.
 * @param {*} props 
 * @returns 
 */
const Collection = (props) => {

    // Will have to manually update these numbers after every patch.
    const totalCollection = 747

    const capacity = 40;
    const {data, loading} = useFetchData("https://xivapi.com/character/" + props.id + "?data=MIMO");
    const [mountPage, setMountPage] = useState(0);
    const [minionPage, setMinionPage] = useState(0);
    const [mountContent, setMountContent] = useState(null);
    const [minionContent, setMinionContent] = useState(null);

    useEffect(() => {
        if (!loading) {
            if (data.Mounts !== null) {
                setMountContent(
                    <div className='collection'>
                        {data.Mounts.slice(mountPage * capacity, (mountPage + 1) * capacity).map((mount, index) => {
                            return <Item name={mount.Name} icon={mount.Icon} key={index} />
                        })}
                    </div>
                )
            }
            if (data.Minions !== null) {
                setMinionContent(
                    <div className='collection'>
                        {data.Minions.slice(minionPage * capacity, (minionPage + 1) * capacity).map((minion, index) => {
                            return <Item name={minion.Name} icon={minion.Icon} key={index} />
                        })}
                    </div>                    
                )
            }
        }   
    }, [data, loading, mountPage, minionPage]);

    return (
        loading ?
        null :

        <div className={"section" + (props.display ? '' : ' disabled')}>
            <Header 
                name="Collection" 
                minor={Math.round((data.Mounts.length + data.Minions.length)) + " / " + totalCollection}
                major={Math.round((data.Mounts.length + data.Minions.length) / totalCollection * 100) + " %"}
            />
            <div className='collection__content'>
                <div className='col gap-lg'>
                    {mountContent}
                    <Navigator 
                        update={setMountPage} 
                        current={mountPage} 
                        min={0} 
                        max={Math.ceil(data.Mounts.length / capacity) - 1} 
                        style={{margin: 'auto'}}
                    />
                </div>
                <div className='col gap-lg'>
                    {minionContent}
                    <Navigator 
                        update={setMinionPage} 
                        current={minionPage} 
                        min={0} 
                        max={Math.ceil(data.Minions.length / capacity) - 1} 
                        style={{margin: 'auto'}}
                    />
                </div>
            </div>
        </div>
    );
} 

export default Collection;