import { useState, useEffect } from 'react';
import Divider from './Divider';
import itemFrame from '../images/item-frame.png';
import glamourIcon from '../images/glamour.png';
import '../styles/Item.css'

const mainStatReference = ['DamagePhys', 'DamageMag', 'DefensePhys', 'DefenseMag', 'Block', 'BlockRate', 'DelayMs']
const statName = ['Physical Damage', 'Magic Damage', 'Defense', 'Magic Defense', 'Block Strength', 'Block Rate', 'Delay']

const Item = (props) => {
    const [isGlamour, setIsGlamour] = useState(false);
    const [itemLevel, setItemLevel] = useState(null);
    const [stats, setStats] = useState(null);
    const [glamour, setGlamour] = useState(null);
    const [materia, setMateria] = useState(null);

    // On mount, determine if glamour or materia content is available,
    // if it is, add to tooltip. 
    useEffect(() => {
        if (props.glamour !== null && props.glamour !== undefined) {
            setIsGlamour(true);
            setGlamour(
                <>
                    <h5>Glamour</h5>
                    <div className="row align-center gap">
                        <img src={"https://xivapi.com" + props.glamour.Icon} className="tooltip__icon" alt='' />  
                        <img src={itemFrame} className="tooltip__icon absolute" alt='' />
                        <p>{props.glamour.Name}</p>
                    </div>
                </>
            )
        }
        if (props.materia !== undefined && props.materia.length > 0) {
            setMateria(
                <>
                    <h5>Materia</h5>
                    {props.materia.map((mat, index) => 
                    <div className="row align-center gap" key={index}>
                        <img src={"https://xivapi.com" + mat.Icon} className="tooltip__icon" alt='' />  
                        <img src={itemFrame} className="tooltip__icon absolute" alt='' />
                        <p>{mat.Name}</p>
                    </div>)}
                </>
            )
        }

        // Fetch attribute data if the item is an equipment piece.
        if (props.id !== undefined) {
            fetchData();
        }
    }, [])

    const fetchData = async () => {
        /*
        This function fetches the data for a particular equipment item. 
        Updates the item level, main stats, and bonus stats of the tooltip.
        */

        // Fetch data
        let itemData;
        await fetch("https://xivapi.com/item/" + props.id, {mode: 'cors'})
            .then(response => response.json())
            .then(data => itemData = data);

        // Update state with data
        setItemLevel("Level " + itemData.LevelItem);
        if (props.type !== 'SoulCrystal') {    // Soul Crystals do not have any stats.
            setStats(
                <>
                    <Divider />
                    {
                        <div className='row gap justify-end'>
                            {
                                mainStatReference.map((stat, index) =>
                                    itemData[stat] !== 0 ?
                                    <div className='col gap' key={index}>
                                        <p>{statName[index]}</p>
                                        <h5 className='text-end'>{itemData[stat]}</h5>
                                    </div> :
                                    null
                                )
                            }
                        </div>
                    }
                    <h5>Bonuses</h5>
                    <div className='tooltip__stats'>
                        {
                            itemData.Stats !== undefined ?
                            Object.keys(itemData.Stats).map(stat => 
                                <div className='row justify-between gap' key={itemData.Stats[stat].ID}>
                                    <p>{stat}</p>
                                    <h5>{itemData.Stats[stat].NQ}</h5>
                                </div>
                            ) :
                            null
                        }
                    </div>
                </>
            )
        }
    }
    
    return (
        <div className="item interactable" style={{gridArea: props.type}}>
            <img src={glamourIcon} className={isGlamour ? "glamour-icon absolute"  : "disabled"} alt="Glamour Indicator"/>
            <img src={props.icon} className="item__icon absolute" alt={props.name}/>
            <img src={itemFrame} className="item__icon absolute" alt=''/>
  
            <div className="tooltip">
                <div className='tooltip__header'>
                    <div style={{gridArea: 'icon'}}>
                        <img src={props.icon} className="item__icon absolute" alt={props.name}/>
                        <img src={itemFrame} className="item__icon absolute" alt=''/>
                    </div>
                    <h4 style={{gridArea: 'name', color: 'var(--c-major-text)'}}>{props.name}</h4>
                    <p style={{gridArea: 'type'}}>{props.type}</p>
                    <p style={{gridArea: 'level', textAlign: 'end'}}>{itemLevel}</p>
                </div>
                {stats}
                {materia}
                {glamour}
            </div>
        </div>
    );
} 

export default Item;