import "../styles/CompletionMetric.css";

const CompletionMetric = (props) => {
  const { numerator, denominator } = props;
  const percentage = Math.round((numerator / denominator) * 100);
  return (
    <div className="completion-rate">
      <div
        className="completion-radial"
        style={{
          background:
            "radial-gradient(closest-side, var(--c-content-background-opaque) 77%, transparent 80% 100%), conic-gradient(var(--color-completed) " +
            percentage +
            "%, var(--c-mid-background) 0)",
        }}
      >
        {" "}
        <p>{numerator + " / " + denominator}</p>
      </div>
      <h3>{percentage + " %"}</h3>
    </div>
  );
};

export default CompletionMetric;
