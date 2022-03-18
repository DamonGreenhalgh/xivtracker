import './Attributes.css';
import Header from './Header';

const Attributes = (props) => {
    return (
        <div className="attributes section">
            <Header name="Attributes" />
            <ul className="attributes__list">
                <div className="attributes__main">
                    <p>{props.content.at(-2).Attribute.Name}</p>
                    <h4>{props.content.at(-2).Value}</h4>
                    <div className="attributes__bar hp" />
                </div>
                <div className="attributes__main">
                    <p>{props.content.at(-1).Attribute.Name}</p>
                    <h4>{props.content.at(-1).Value}</h4>
                    <div className="attributes__bar mp" />
                </div>
                {Object.values(props.content).slice(0, -2).map(attribute =>
                    <li className="attributes__item" key={attribute.Attribute.ID}>
                        <p>{attribute.Attribute.Name}</p>
                        <h4>{attribute.Value}</h4>
                    </li> 
                )}
            </ul>
        </div>
    );
}

export default Attributes;