import './Searchbar.css';
import { useState, useEffect  }  from 'react';
import { Link } from 'react-router-dom';
import { FaChevronDown, FaChevronUp, FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { VscSettings } from 'react-icons/vsc';

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
                    <Link to={"/character/" + char.id} key={char.id}>
                        <div className="recent__profile interactable">
                            <img src={char.avatar} className="rounded recent__avatar" />
                            <div>
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
            className={props.isSearching ? "disabled" : "searchbar"} 
            onSubmit={callbackMethod} 
            autoComplete="off"
        >
            <div className={displayDropdown ? "select select--dropdown" : "select"} onClick={() => {setDisplayDropdown(displayDropdown ? false : true); setDisplayRecent(false)}}>
                {server}
                {displayDropdown ? <FaChevronUp /> : <FaChevronDown />}
                <div className={"options" + (displayDropdown ? " options--serverlist" : "")} onClick={(e) => setServer(e.target.innerText)}>
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
                    <div>HongYuHai</div>
                    <div>ShenYiZhiDi</div>
                    <div>LaNuoXiYa</div>
                    <div>HuanYingQunDao</div>
                    <div>MengYaChi</div>
                    <div>YuZhouHeYin</div>
                    <div>WoXianXiRan</div>
                    <div>ChenXiWangZuo</div>
                    <div>BaiYinXiang</div>
                    <div>BaiJinHuanXiang</div>
                    <div>ShenQuanHen</div>
                    <div>ChaoFengTing</div>
                    <div>LvRenZhanQiao</div>
                    <div>FuXiaoZhiJian</div>
                    <div>Longchaoshendian</div>
                    <div>MengYuBaoJing</div>
                    <div>ZiShuiZhanQiao</div>
                    <div>YanXia</div>
                    <div>JingYuZhuangYuan</div>
                    <div>MoDuNa</div>
                    <div>HaiMaoChaWu</div>
                    <div>RouFengHaiWan</div>
                    <div>HuPoYuan</div>
                </div>
            </div>
            <input
                type="text"
                className="searchbar__text-box"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                style={{width: "12rem"}}
                onClick={() => {setDisplayRecent(true); setDisplayDropdown(false)}}
            />
            <button className="searchbar__search-button" title="Search">
                <FaSearch />
            </button>
            <Link to="/settings" title="Settings" style={{display: "flex", alignItems: "center"}}>
                <button><VscSettings className="navbar__icon" /></button>
            </Link>
            <div className={displayRecent ? "recent" : "disabled"}>
                <div className="recent__tab">
                    <h4>Recently Viewed</h4>
                    <MdClose className="interactable" onClick={() => setDisplayRecent(false)}/>
                </div>
                <div className='divider--horizontal' />
                <div className="recent__collection">
                    {recent}
                </div>             
            </div>
        </form>
    );
}

export default Searchbar;
