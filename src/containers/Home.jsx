import { useEffect, useState } from "react";
import MiniBanner from "../components/MiniBanner";
import Featured from "../components/Featured";
import Loading from "../components/Loading";
import brandIcon from "../images/brand-extended.png";
import Searchbar from "../components/Searchbar";
import "../styles/Home.css";

const Home = () => {
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to request a character search from xivapi.com.
  const searchCharacter = async (name, server) => {
    setIsLoading(true);
    setResults(null);

    // If serverlist value was left on default, set to "" for the GET request.
    let currentServer = "";
    if (server !== "Server") {
      currentServer = server;
    }

    // Fetch character search for xivapi.com.
    await fetch(
      "https://xivapi.com/character/search?name=" +
        name +
        "&server=" +
        currentServer,
      { mode: "cors" }
    )
      .then((response) => response.json())
      .then((data) => {
        // Create character banners for each valid returned character.
        setResults(
          data.Results.map((result) => (
            <MiniBanner character={result} key={result.ID} />
          ))
        );
      });
    setIsLoading(false);
  };

  // On page load, check if there are url search parameters.
  // If they exist, use them for the search.
  useEffect(() => {
    document.title = "XIV Tracker";
    const searchParams = new URLSearchParams(window.location.search);
    const urlName = searchParams.get("name");
    const urlServer = searchParams.get("server");
    if (urlName !== null) {
      searchCharacter(urlName, urlServer);
    }

    // Set new content width
    document.documentElement.style.setProperty("--content-width", "30rem");
  }, []);

  return (
    <div className="home">
      <img src={brandIcon} className="home__brand" alt="xiv tracker" />
      {isLoading ? <Loading /> : null}
      <Searchbar />
      <Featured />
      <div
        className={
          "home__search-container" + (results === null ? " disabled" : "")
        }
      >
        {results}
      </div>
    </div>
  );
};

export default Home;
