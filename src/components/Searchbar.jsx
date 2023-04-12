import { useState, useEffect } from "react";
import { useFetchData } from "../hooks/useFetchData";

// Components
import Divider from "./Divider";
import MiniBanner from "./MiniBanner";
import Button from "../components/Button";
import Loading from "../components/Loading";

// Style
import "../styles/Searchbar.css";
import { FaSearch, FaServer, FaTimes, FaClock } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";

const Searchbar = (props) => {
  const [displayRecent, setDisplayRecent] = useState(false);
  const [name, setName] = useState("");
  const [server, setServer] = useState("Server");
  const [recent, setRecent] = useState(null);
  const [results, setResults] = useState(null);
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
      <BsPersonFill className="searchbar__icon" />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
        name="name"
        onClick={() => {
          setDisplayRecent(true);
        }}
      />
      <FaSearch style={{ minWidth: "2rem" }} />
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
            text={server}
            title="Show server select"
            onClick={() => setTabIndex(2)}
            icon={<FaServer className="character__icon" />}
            condition={tabIndex === 2}
            style={{ marginLeft: "auto" }}
            type="minor"
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
        ) : tabIndex === 2 ? (
          <div className="data-center-container">
            <h4 style={{ gridArea: "na" }}>North America</h4>
            <h5 style={{ gridArea: "Aether" }}>Aether</h5>
            <div
              className="data-center"
              onClick={(e) => setServer(e.target.innerText)}
              style={{ gridArea: "AetherServers" }}
            >
              <button>Adamantoise</button>
              <button>Cactuar</button>
              <button>Faerie</button>
              <button>Gilgamesh</button>
              <button>Jenova</button>
              <button>Midgardsormr</button>
              <button>Sargatanas</button>
              <button>Siren</button>
            </div>

            <h5 style={{ gridArea: "Crystal" }}>Crystal</h5>
            <div
              className="data-center"
              style={{ gridArea: "CrystalServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Balmung</button>
              <button>Brynhildr</button>
              <button>Coeurl</button>
              <button>Diabolos</button>
              <button>Goblin</button>
              <button>Malboro</button>
              <button>Mateus</button>
              <button>Zalera</button>
            </div>
            <h5 style={{ gridArea: "Dynamis" }}>Dynamis</h5>
            <div
              className="data-center"
              style={{ gridArea: "DynamisServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Halicarnassus</button>
              <button>Maduin</button>
              <button>Marilith</button>
              <button>Seraph</button>
            </div>
            <h5 style={{ gridArea: "Primal" }}>Primal</h5>
            <div
              className="data-center"
              style={{ gridArea: "PrimalServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Behemoth</button>
              <button>Excalibur</button>
              <button>Exodus</button>
              <button>Famfrit</button>
              <button>Hyperion</button>
              <button>Lamia</button>
              <button>Leviathan</button>
              <button>Ultros</button>
            </div>
            <h4 style={{ gridArea: "eu" }}>Europe</h4>
            <h5 style={{ gridArea: "Chaos" }}>Chaos</h5>
            <div
              className="data-center"
              style={{ gridArea: "ChaosServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Cerberus</button>
              <button>Louisoix</button>
              <button>Moogle</button>
              <button>Omega</button>
              <button>Phantom</button>
              <button>Ragnarok</button>
              <button>Sagittarius</button>
              <button>Spriggan</button>
            </div>
            <h5 style={{ gridArea: "Light" }}>Light</h5>
            <div
              className="data-center"
              style={{ gridArea: "LightServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Alpha</button>
              <button>Lich</button>
              <button>Odin</button>
              <button>Phoenix</button>
              <button>Raiden</button>
              <button>Shiva</button>
              <button>Twintania</button>
              <button>Zodiark</button>
            </div>
            <h4 style={{ gridArea: "oce" }}>Oceania</h4>
            <h5 style={{ gridArea: "Materia" }}>Materia</h5>
            <div
              className="data-center"
              style={{ gridArea: "MateriaServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Bismarck</button>
              <button>Ravana</button>
              <button>Sephirot</button>
              <button>Sophia</button>
              <button>Zurvan</button>
            </div>
            <h4 style={{ gridArea: "jp" }}>Japan</h4>
            <h5 style={{ gridArea: "Elemental" }}>Elemental</h5>

            <div
              className="data-center"
              style={{ gridArea: "ElementalServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Aegis</button>
              <button>Atomos</button>
              <button>Carbuncle</button>
              <button>Garuda</button>
              <button>Gungnir</button>
              <button>Kujata</button>
              <button>Tonberry</button>
              <button>Typhon</button>
            </div>
            <h5 style={{ gridArea: "Gaia" }}>Gaia</h5>
            <div
              className="data-center"
              style={{ gridArea: "GaiaServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Alexander</button>
              <button>Bahamut</button>
              <button>Durandal</button>
              <button>Fenrir</button>
              <button>Ifrit</button>
              <button>Ridill</button>
              <button>Tiamat</button>
              <button>Ultima</button>
            </div>
            <h5 style={{ gridArea: "Mana" }}>Mana</h5>
            <div
              className="data-center"
              style={{ gridArea: "ManaServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Anima</button>
              <button>Asura</button>
              <button>Chocobo</button>
              <button>Hades</button>
              <button>Ixion</button>
              <button>Masamune</button>
              <button>Pandaemonium</button>
              <button>Titan</button>
            </div>
            <h5 style={{ gridArea: "Meteor" }}>Meteor</h5>
            <div
              className="data-center"
              style={{ gridArea: "MeteorServers" }}
              onClick={(e) => setServer(e.target.innerText)}
            >
              <button>Belias</button>
              <button>Mandragora</button>
              <button>Ramuh</button>
              <button>Shinryu</button>
              <button>Unicorn</button>
              <button>Valefor</button>
              <button>Yojimbo</button>
              <button>Zeromus</button>
            </div>
          </div>
        ) : (
          <div
            className="banner--mini-container"
            onClick={() => setDisplayRecent(false)}
          >
            {tabIndex === 0 ? recent : results}
          </div>
        )}
      </div>
    </form>
  );
};

export default Searchbar;
