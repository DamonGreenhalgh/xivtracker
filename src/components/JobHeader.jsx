import Divider from './utility/Divider';
const JobHeader = (props) => {
    return (
        <div className="col" style={{gridArea: props.name}}>
            <div className="row align-center gap-sm">
                <img src={props.icon} />
                <h4>Tank</h4>
            </div>
            <Divider />
        </div>
    );
} 

export default JobHeader;