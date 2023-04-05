import "../styles/Button.css";

const Button = (props) => {
  const { type, condition, onClick, style, content, title } = props;
  return (
    <button
      className={
        "button button--" +
        type +
        (condition ? " button--active button--active--" + type : "")
      }
      onClick={onClick}
      style={style}
      title={title}
    >
      {content}
    </button>
  );
};

Button.defaultProps = {
  type: "",
  condition: false,
  content: "",
  onClick: null,
};

export default Button;
