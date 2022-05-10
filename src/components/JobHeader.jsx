import Divider from './Divider';
const JobHeader = (props) => {
    return (
        <div className="col gap-xsm" style={{gridArea: props.name}}>
            <div className="row align-center gap-sm">
                <img src={props.icon} />
                <h4>{props.name}</h4>
            </div>
            <Divider />
        </div>
    );
} 

export default JobHeader;