import "../styles/Button.css";

const Button = (props) => {
  const { type, condition, onClick, style, icon, text, title, className } =
    props;
  return (
    <button
      className={
        "button--" +
        type +
        " " +
        className +
        (condition ? " button--active--" + type : "")
      }
      style={style}
      onClick={onClick}
      title={title}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
};

Button.defaultProps = {
  type: "mid",
  condition: false,
  onClick: null,
};

export default Button;
