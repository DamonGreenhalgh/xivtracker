import './Item.css'
import itemFrame from '../images/item-frame.png';
import { useState, useEffect } from 'react';
import glamourIcon from '../images/glamour.png';
import Divider from './utility/Divider';

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
    
    return (
        <div className="item" style={{gridArea: props.gridArea}} title={props.name}>
            <img src={glamourIcon} className={isGlamour ? "glamour-icon absolute"  : "disabled"}/>
            <img src={props.icon} className="item__icon absolute" />
            <img src={itemFrame} className="item__icon absolute" />
            <div className="tooltip">
                <h4>{props.name}</h4>
                {
                    hasContent ?
                    <>
                        <Divider />
                        {
                            isGlamour ?
                            <>
                                <h5>Glamour</h5>
                                <div className="tooltip__icon-container">
                                    <img src={"https://xivapi.com" + props.glamour.Icon} className="tooltip__icon" />  
                                    <img src={itemFrame} className="tooltip__icon absolute" />
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
                                <div className="tooltip__icon-container" key={index}>
                                    <img src={"https://xivapi.com" + mat.Icon} className="tooltip__icon" />  
                                    <img src={itemFrame} className="tooltip__icon absolute" />
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