import './Attributes.css';
import Header from './Header';

const Attributes = (props) => {
    return (
        <>
            <div className="attributes section">
                <Header name="Attributes" />
                <div className="row">
                    <div className="attributes__main-container">
                        <div className="attributes__list__item">
                            <p>{props.content.at(-2).Attribute.Name}</p>
                            <h4>{props.content.at(-2).Value}</h4>
                        </div>
                        <div className="attributes__bar hp"></div>
                    </div>
                    <div className="attributes__main-container">
                        <div className="attributes__list__item">
                            <p>{props.content.at(-1).Attribute.Name}</p>
                            <h4>{props.content.at(-1).Value}</h4>
                        </div>
                        <div className="attributes__bar mp"></div>
                    </div>
                </div>         
                <ul className="attributes__list">
                    {Object.values(props.content).slice(0, -2).map(attribute =>
                        <li className="attributes__list__item" key={attribute.Attribute.ID}>
                            <p>{attribute.Attribute.Name}</p>
                            <h4>{attribute.Value}</h4>
                        </li> 
                    )}
                </ul>
            </div>
        </>

    );
}

export default Attributes;