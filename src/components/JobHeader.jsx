import Divider from './Divider';
const JobHeader = (props) => {
    const {
        name,
        icon
    } = props;
    return (
        <div className="col gap-xsm" style={{gridArea: name}}>
            <div className="row align-center gap-sm">
                <img src={icon} alt="" />
                <h4>{name}</h4>
            </div>
            <Divider />
        </div>
    );
} 

export default JobHeader;