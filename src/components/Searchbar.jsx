import { useState, useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";

// Components
import Divider from "./Divider";
import MiniBanner from "./MiniBanner";
import Button from "../components/Button";
import Loading from "../components/Loading";

// Style
import "../styles/Searchbar.css";
import { FaSearch, FaServer, FaStar, FaTimes, FaClock } from "react-icons/fa";
import { BsChevronDown, BsChevronUp, BsPersonFill } from "react-icons/bs";

const Searchbar = (props) => {
  const [displayRecent, setDisplayRecent] = useState(false);
  const [name, setName] = useState("");
  const [server, setServer] = useState("Server");
  const [displayDropdown, setDisplayDropdown] = useState(false);
  const [recent, setRecent] = useState(null);
  const [results, setResults] = useState(null);
  const [favourites, setFavourites] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const { data, loading, ok } = useFetchData(
    "https://xivapi.com/character/search?name=" +
      name +
      "&server=" +
      (server !== "Server" ? server : "")
  );

  useEffect(() => {
    if (ok && data !== null) {
      setResults(
        data.Results.map((result) => (
          <MiniBanner character={result} key={result.ID} />
        ))
      );
      setTabIndex(1);
    } else {
      setResults(null);
      setTabIndex(0);
    }
  }, [data]);

  useEffect(() => {
    if (loading) {
      setTabIndex(1);
    }
  }, [loading]);

  useEffect(() => {
    const recentSearches = JSON.parse(localStorage.getItem("recent"));
    if (recentSearches !== null) {
      setRecent(
        recentSearches.map((character) => {
          return <MiniBanner character={character} key={character.ID} />;
        })
      );
    }
  }, []);

  return (
    <form
      className={"searchbar searchbar--" + props.type}
      onSubmit={(e) => e.preventDefault()}
      autoComplete="off"
    >
      <div
        className="select"
        style={{ outline: "none" }}
        onClick={() => {
          setDisplayDropdown(displayDropdown ? false : true);
          setDisplayRecent(false);
        }}
      >
        <FaServer />
        {server}
        {displayDropdown ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      <BsPersonFill className="searchbar__icon" />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          // searchCharacter(name, server);
        }}
        name="name"
        onClick={() => {
          setDisplayRecent(true);
          setDisplayDropdown(false);
        }}
      />
      <FaSearch style={{ minWidth: "2rem" }} />
      <div className={"recent" + (displayDropdown ? " recent--active" : "")}>
        <div className="row align-center gap">
          <Button
            title="Close"
            onClick={() => setDisplayDropdown(false)}
            icon={<FaTimes className="character__icon" />}
            type="minor"
            style={{ marginLeft: "auto" }}
          />
        </div>
        <Divider />
        <div
          className="recent__servers"
          onClick={(e) => setServer(e.target.innerText)}
        >
          <div>Server</div>
          <div>Adamantoise</div>
          <div>Aegis</div>
          <div>Alexander</div>
          <div>Anima</div>
          <div>Asura</div>
          <div>Atomos</div>
          <div>Bahamut</div>
          <div>Balmung</div>
          <div>Behemoth</div>
          <div>Belias</div>
          <div>Brynhildr</div>
          <div>Cactuar</div>
          <div>Carbuncle</div>
          <div>Cerberus</div>
          <div>Chocobo</div>
          <div>Coeurl</div>
          <div>Diabolos</div>
          <div>Durandal</div>
          <div>Excalibur</div>
          <div>Exodus</div>
          <div>Faerie</div>
          <div>Famfrit</div>
          <div>Fenrir</div>
          <div>Garuda</div>
          <div>Gilgamesh</div>
          <div>Goblin</div>
          <div>Gungnir</div>
          <div>Hades</div>
          <div>Hyperion</div>
          <div>Ifrit</div>
          <div>Ixion</div>
          <div>Jenova</div>
          <div>Kujata</div>
          <div>Lamia</div>
          <div>Leviathan</div>
          <div>Lich</div>
          <div>Louisoix</div>
          <div>Malboro</div>
          <div>Mandragora</div>
          <div>Masamune</div>
          <div>Mateus</div>
          <div>Midgardsormr</div>
          <div>Moogle</div>
          <div>Odin</div>
          <div>Omega</div>
          <div>Pandaemonium</div>
          <div>Phoenix</div>
          <div>Ragnarok</div>
          <div>Ramuh</div>
          <div>Ridill</div>
          <div>Sargatanas</div>
          <div>Shinryu</div>
          <div>Shiva</div>
          <div>Siren</div>
          <div>Tiamat</div>
          <div>Titan</div>
          <div>Tonberry</div>
          <div>Typhon</div>
          <div>Ultima</div>
          <div>Ultros</div>
          <div>Unicorn</div>
          <div>Valefor</div>
          <div>Yojimbo</div>
          <div>Zalera</div>
          <div>Zeromus</div>
          <div>Zodiark</div>
          <div>Spriggan</div>
          <div>Twintania</div>
          <div>Bismarck</div>
          <div>Ravana</div>
          <div>Sephirot</div>
          <div>Sophia</div>
          <div>Zurvan</div>
        </div>
      </div>
      <div className={"recent " + (displayRecent ? " recent--active" : "")}>
        <div className="row align-center gap">
          <Button
            text="Recent"
            title="Show recent characters"
            onClick={() => setTabIndex(0)}
            icon={<FaClock className="character__icon" />}
            condition={tabIndex === 0}
            type="minor"
          />
          <Button
            text="Search"
            title="Search results"
            onClick={() => setTabIndex(1)}
            icon={<FaSearch className="character__icon" />}
            condition={tabIndex === 1}
            type="minor"
          />
          <Button
            text="Favourites"
            title="Show favourites"
            onClick={() => setTabIndex(2)}
            icon={<FaStar className="character__icon" />}
            condition={tabIndex === 2}
            type="minor"
            style={{ color: "var(--color-experience)", marginLeft: "auto" }}
          />
          <Button
            title="Close"
            onClick={() => setDisplayRecent(false)}
            icon={<FaTimes className="character__icon" />}
            type="minor"
          />
        </div>
        <Divider />
        {loading ? (
          <Loading />
        ) : (
          <div
            className="banner--mini-container"
            onClick={() => setDisplayRecent(false)}
          >
            {tabIndex === 0 ? recent : tabIndex === 1 ? results : favourites}
          </div>
        )}
      </div>
    </form>
  );
};

export default Searchbar;
