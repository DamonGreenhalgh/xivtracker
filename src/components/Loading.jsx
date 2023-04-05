import "../styles/Loading.css";
import titan from "../images/titan.png";
import { useEffect, useState } from "react";

const descriptions = [
  "Fetching data from Lodestone",
  "Feeding carbuncle",
  "Applying materia to equipment",
  "This is Thancred",
  "Eating some archon loaf",
  "Farming mounts",
  "Walking alone to the end",
];
const periods = [".", "..", "..."];
const Loading = (props) => {
  const { full } = props;
  const [perIndex, setPerIndex] = useState(0);
  const [descIndex, setDescIndex] = useState(0);
  useEffect(() => {
    const descInterval = setInterval(
      () => setDescIndex((descIndex) => (descIndex + 1) % descriptions.length),
      3000
    );
    const perInterval = setInterval(
      () => setPerIndex((perIndex) => (perIndex + 1) % periods.length),
      1000
    );
    return () => {
      clearInterval(descInterval);
      clearInterval(perInterval);
    };
  }, []);

  return (
    <div
      className={
        "col align-center justify-center gap-lg" + (full ? " full-page" : "")
      }
    >
      <img src={titan} className="loading__icon" alt="Loading Icon" />
      <p>{descriptions[descIndex] + " " + periods[perIndex]}</p>
    </div>
  );
};

export default Loading;
