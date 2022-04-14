import { useEffect, useState } from "react";
import Item from "./Item";
const Achievement = (props) => {

    const [description, setDescription] = useState(null);
    const [type, setType] = useState(null);

    useEffect(() => {

        const fetchData = async () => {
            await fetch("https://xivapi.com/achievement/" + props.id, {mode: 'cors'})
                .then(response => response.json())
                .then(data => {
                    setDescription(data.Description);
                    setType(data.AchievementCategory.Name);
            });
        }

        fetchData();

    }, [])
    return (
        <li className='achievement'>
            <Item icon={"https://xivapi.com" + props.icon}/>
            <div className='col gap-sm'>
                <div className='row gap'>
                    <h4>{props.name}</h4>
                    <p>{type}</p>
                </div>
                <p>{description}</p>
            </div>
            <h3 style={{marginLeft: 'auto', color: 'var(--color-completed)'}}>{props.points}</h3>
        </li>
    );
}

export default Achievement;