import Featured from "../components/Featured";
import brandIcon from "../images/brand-extended.png";
import Searchbar from "../components/Searchbar";
import "../styles/Home.css";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "XIV Tracker";
  }, []);
  return (
    <div className="home">
      <img src={brandIcon} className="home__brand" alt="xiv tracker" />
      <Searchbar />
      <Featured />
    </div>
  );
};

export default Home;
