import Divider from './utility/Divider';
const Header = (props) => {
    return (
        <div className="row justify-center align-center gap-lg">
            <Divider />
            <h2>{props.name}</h2>
            <Divider />
        </div>
    );
}

export default Header;