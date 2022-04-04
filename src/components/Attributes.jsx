import './Attributes.css';
import Bar from './utility/Bar';

const Attributes = (props) => {
    return (
        <div className="attributes">
            <h2 className='text-center'>Attributes</h2>
            <ul className="attributes__list">
                <div className="attributes__main">
                    <p>{props.content.at(-2).Attribute.Name}</p>
                    <h4>{props.content.at(-2).Value}</h4>
                    <Bar color="var(--color-health)" width="100%" />
                </div>
                <div className="attributes__main">
                    <p>{props.content.at(-1).Attribute.Name}</p>
                    <h4>{props.content.at(-1).Value}</h4>
                    <Bar color="var(--color-mana)" width="100%" />
                </div>
                {Object.values(props.content).slice(0, -2).map(attribute =>
                    <li className="row justify-between gap-lg" key={attribute.Attribute.ID}>
                        <p>{attribute.Attribute.Name}</p>
                        <h4>{attribute.Value}</h4>
                    </li> 
                )}
            </ul>
        </div>
    );
}

export default Attributes;