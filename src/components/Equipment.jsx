import './Equipment.css';
import Item from './Item';
import JobItem from './JobItem';

const Equipment = (props) => {

    const equipmentNames = Object.keys(props.gear);

    return (
        <div className="equipment">
            <div style={{backgroundImage: "url('" + props.portrait + "')"}} className="equipment__portrait">
                <JobItem 
                    name={props.name} 
                    level={props.level} 
                    exp={props.exp} 
                    icon={props.icon}
                    currentJob={true}
                    hasLink={true}
                />
            </div>
            {Object.values(props.gear).map((item, index) => 
                <Item 
                    type={equipmentNames[index]}
                    name={item.Item.Name}
                    icon={("https://xivapi.com" + item.Item.Icon).slice(0, -4) + "_hr1.png"}
                    materia={item.Materia}
                    glamour={item.Mirage}
                    id={item.Item.ID}
                    key={index}
                />
            )}
        </div>
    );
}

export default Equipment;