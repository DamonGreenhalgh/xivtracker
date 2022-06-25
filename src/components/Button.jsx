import '../styles/Button.css';

const Button = (props) => {
    return(
        <button 
            className={"button button--" + props.type + (props.condition ? " button--active button--active--" + props.type : "")} 
            onClick={props.onClick} 
            style={props.style}
        >
            {props.content}
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