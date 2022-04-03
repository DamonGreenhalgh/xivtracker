import { useState, useEffect } from 'react';
import Divider from './utility/Divider';
import itemFrame from '../images/item-frame.png';
import glamourIcon from '../images/glamour.png';
import './Item.css'

const Item = (props) => {
    const [hasContent, setHasContent] = useState(null);
    const[isGlamour, setIsGlamour] = useState(false);
    const[isMateria, setIsMateria] = useState(false);

    // On mount, determine if glamour or materia content is available,
    // if it is, add to tooltip. 
    useEffect(() => {
        if (props.glamour !== null && props.glamour !== undefined) {
            setIsGlamour(true);
            setHasContent(true);
        }
        if (props.materia !== undefined && props.materia.length > 0) {
            setIsMateria(true);
            setHasContent(true);
        }
    }, [])

    const fetchData = async () => {
        if (props.id !== undefined) {
            await fetch("https://xivapi.com/item/" + props.id, {mode: 'cors'})
                .then(response => response.json())
                .then(data => console.log(data))
        }
    }
    
    return (
        <div className="item interactable" style={{gridArea: props.gridArea}} onMouseEnter={fetchData}>
            <img src={glamourIcon} className={isGlamour ? "glamour-icon absolute"  : "disabled"} alt="Glamour Indicator"/>
            <img src={props.icon} className="item__icon absolute" alt={props.name + " Icon"}/>
            <img src={itemFrame} className="item__icon absolute" alt=''/>
            <div className="tooltip">
                <div className='tooltip__arrow' />
                <h4>{props.name}</h4>
                {
                    hasContent ?
                    <>
                        <Divider />
                        {
                            isGlamour ?
                            <>
                                <h5>Glamour</h5>
                                <div className="row align-center gap">
                                    <img src={"https://xivapi.com" + props.glamour.Icon} className="tooltip__icon" alt='' />  
                                    <img src={itemFrame} className="tooltip__icon absolute" alt='' />
                                    <p>{props.glamour.Name}</p>
                                </div>
                            </> :
                            null
                        }
                        {
                            isMateria ? 
                            <>
                                <h5>Materia</h5>
                                {props.materia.map((mat, index) => 
                                <div className="row align-center gap" key={index}>
                                    <img src={"https://xivapi.com" + mat.Icon} className="tooltip__icon" alt='' />  
                                    <img src={itemFrame} className="tooltip__icon absolute" alt='' />
                                    <p>{mat.Name}</p>
                                </div>)}
                            </> :
                            null
                        }
                    </> :
                    null
                }
            </div>
        </div>
    );
} 

export default Item;