import './Item.css'
import itemFrame from '../images/item-frame.png'

const Item = (props) => {
    return (
        <div className="item" style={{gridArea: props.gridArea}} title={props.name}>
            <img src={props.icon}></img>
            <img src={itemFrame}></img>
        </div>
    );
} 

export default Item;