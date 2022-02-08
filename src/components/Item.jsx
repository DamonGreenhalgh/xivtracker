import './Item.css'
import itemFrame from '../images/item-frame.png';
import { useState, useEffect } from 'react';

const Item = (props) => {

    const [glamour, setGlamour] = useState(null);
    const [materia, setMateria] = useState(null);
    const [hasContent, setHasContent] = useState(null);

    // On mount, determine if glamour or materia content is available,
    // if it is, add to tooltip. 
    useEffect(() => {
        if (props.glamour !== null && props.glamour !== undefined) {
            setGlamour( 
            <>
                <h5>Glamour</h5>
                <div className="tooltip__icon-container">
                    <img src={"https://xivapi.com" + props.glamour.Icon} className="tooltip__icon" />  
                    <img src={itemFrame} className="tooltip__icon absolute" />
                    <p>{props.glamour.Name}</p>
                </div>
            </>
            );
            setHasContent(true);
        }
    
        if (props.materia !== undefined) {
            if(props.materia.length > 0) {
                setMateria(
                <>
                    <h5>Materia</h5>
                    {props.materia.map((mat, index) => 
                    <div className="tooltip__icon-container" key={index}>
                        <img src={"https://xivapi.com" + mat.Icon} className="tooltip__icon" />  
                        <img src={itemFrame} className="tooltip__icon absolute" />
                        <p>{mat.Name}</p>
                    </div>
                    )}
                </>
                );
                setHasContent(true);
            }
        }
    }, [])
    
    
    return (
        <div className="item" style={{gridArea: props.gridArea}} title={props.name}>
            <img src={props.icon} className="item__icon absolute" />
            <img src={itemFrame} className="item__icon absolute" />
            <div className="tooltip">
                <h4>{props.name}</h4>
                <div className={hasContent ? "divider--horizontal" : "disabled"} />
                {glamour}
                {materia}
            </div>
        </div>
    );
} 

export default Item;