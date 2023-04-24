import Featured from "../components/Featured";
import brandIconDark from "../images/brand-extended-dark.png";
import brandIconLight from "../images/brand-extended-light.png";
import Searchbar from "../components/Searchbar";
import "../styles/Home.css";
import { useEffect } from "react";

const Home = (props) => {
  const { theme } = props;
  useEffect(() => {
    document.title = "XIV Tracker";
  }, []);
  return (
    <div className="home">
      <img
        src={theme === "light" ? brandIconLight : brandIconDark}
        className="home__brand"
        alt="xiv tracker"
      />
      <Searchbar />
      <Featured />
    </div>
  );
};

export default Home;
