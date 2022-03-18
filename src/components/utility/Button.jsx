import './Button.css';

const Button = (props) => {
    return(
        <button 
            className={"button" + (props.condition ? " button--active" : "")} 
            onClick={props.onClick} 
            style={props.style}
        >
            {props.content}
            <div className={"button__overlay" + (props.condition ? " button__overlay--active" : "")} />
        </button>
    );
}

export default Button;