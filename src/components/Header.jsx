import Divider from './utility/Divider';
const Header = (props) => {
    return (
        <div className="col gap-lg">
            <h2>{props.name}</h2>
            <Divider />
        </div>
    );
}

export default Header;