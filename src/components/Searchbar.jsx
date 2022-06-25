import '../styles/Searchbar.css';
import { useState, useEffect  }  from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaServer} from 'react-icons/fa';
import { BsChevronDown, BsChevronUp, BsPersonFill} from 'react-icons/bs'
import { MdClose } from 'react-icons/md';
import Divider from './Divider';

const Searchbar = (props) => {

    const [displayRecent, setDisplayRecent] = useState(false);
    const [name, setName] = useState("");
    const [server, setServer] = useState("Server");
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const [recent, setRecent] = useState(null);

    const callbackMethod = (event) => {
        event.preventDefault();
        setDisplayRecent(false);
        props.search(name, server);
    }

    useEffect(() => {
        const recentSearches = JSON.parse(localStorage.getItem("recent"));
        if (recentSearches !== null) {
            setRecent(recentSearches.map(char => {
                return(
                    <Link to={"/" + char.id} key={char.id}>
                        <div className="recent__profile interactable">
                            <img src={char.avatar} className="rounded recent__avatar" alt="Avatar" />
                            <div className="col gap-xsm">
                                <p><b>{char.name}</b></p>
                                <p style={{fontSize: ".6rem"}}>{char.server}</p>
                            </div>
                        </div>
                    </Link>
                );
            }))
        }
    }, [])

    return (
        <form 
            className={"searchbar searchbar--" + props.type}
            onSubmit={callbackMethod} 
            autoComplete="off"
        >
            <div className="select" onClick={() => {setDisplayDropdown(displayDropdown ? false : true); setDisplayRecent(false)}}>
                <FaServer />
                {server}
                {displayDropdown ? <BsChevronUp /> : <BsChevronDown />}
            </div>
            <BsPersonFill className='searchbar__icon' />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                onClick={() => {setDisplayRecent(displayRecent ? false : true); setDisplayDropdown(false)}}
            />
            <button title="Search">
                <FaSearch />
            </button>
            <div className={"recent recent--" + props.type + (displayDropdown ? " recent--active" : "")}>
                <div className="recent__tab">
                    <h4>Servers</h4>
                    <MdClose className="interactable" onClick={() => setDisplayDropdown(false)}/>
                </div>
                <Divider />
                <div className='recent__servers' onClick={(e) => setServer(e.target.innerText)}>
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
            <div className={"recent recent--" + props.type + (displayRecent ? " recent--active" : "")} onClick={() => setDisplayRecent(false)}>
                <div className="recent__tab">
                    <h4>Recently Viewed</h4>
                    <MdClose className="interactable" onClick={() => setDisplayRecent(false)}/>
                </div>
                <Divider />
                <div className="recent__collection">
                    {recent}
                </div>             
            </div>
        </form>
    );
}

export default Searchbar;
