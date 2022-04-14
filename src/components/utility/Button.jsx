import './Button.css';

const Button = (props) => {
    return(
        <button 
            className={"button button--" + props.type + (props.condition ? " button--active button--active--" + props.type : "")} 
            onClick={props.onClick} 
            style={props.style}
        >
            {props.content}
            <div className={"button__overlay button__overlay--" + props.type + (props.condition ? " button__overlay--active button__overlay--active--" + props.type : "")} />
        </button>
    );
}

Button.defaultProps = {
    type: '',
    condition: false,
    content: '',
    onClick: null
}

export default Button;