import "../styles/Completion.css";

const Completion = (props) => {
  const { title, numerator, denominator } = props;
  const percentage = Math.round((numerator / denominator) * 100);
  return (
    <div className="completion">
      <h4 className="completion__title">{title}</h4>
      <div
        className="completion__radial"
        style={{
          background:
            "radial-gradient(closest-side, var(--c-content-background-opaque) 77%, transparent 80% 100%), conic-gradient(var(--color-completed) " +
            percentage +
            "%, var(--c-mid-background) 0)",
        }}
      >
        {" "}
        <p className="completion__fraction">
          {numerator + " / " + denominator}
        </p>
      </div>
      <h3 className="completion__percentage">{percentage + " %"}</h3>
    </div>
  );
};

export default Completion;
