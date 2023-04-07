import "../styles/Button.css";

const Button = (props) => {
  const { type, condition, onClick, style, content, title, className } = props;
  return (
    <button
      className={
        className +
        " button button--" +
        type +
        (condition ? " button--active button--active--" + type : "")
      }
      onClick={onClick}
      style={style}
      title={title}
    >
      {content}
      <p style={{ marginLeft: "1rem" }}>{title}</p>
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
