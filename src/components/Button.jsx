import '../styles/Button.css';

const Button = (props) => {
    const {
        type,
        condition,
        onClick,
        style,
        content
    } = props;
    return(
        <button 
            className={"button button--" + type + (condition ? " button--active button--active--" + type : "")} 
            onClick={onClick} 
            style={style}
        >
            {content}
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