import { useState }  from 'react';
import './Searchbar.css';
import { FaSearch } from 'react-icons/fa';
import { BsChevronDown } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { VscSettings } from 'react-icons/vsc';

const Searchbar = (props) => {

    const [name, setName] = useState("");
    const [server, setServer] = useState("Server");
    const [displayDropdown, setDisplayDropdown] = useState(false);

    const onChange = (event) => {
        const value = event.target.value;
        setName(value);
    }

    const callbackMethod = (event) => {
        event.preventDefault();
        props.search(name, server);
    }

    return (
        <form className={props.isSearching ? "disabled" : "searchbar"} onSubmit={callbackMethod} autoComplete="off">
            <div className={displayDropdown ? "select select--dropdown" : "select"} onClick={() => setDisplayDropdown(displayDropdown ? false : true)}>
                {server}
                <BsChevronDown />
                <div className={displayDropdown ? "options options--serverlist" : "disabled"} onClick={(e) => setServer(e.target.innerText)}>
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
                onChange={onChange}
                name="name"
                autoFocus="on"
                style={{width: "12rem"}}
            />
            <div className="underline" />
            <button className="searchbar__search-button" title="Search">
                <FaSearch />
            </button>
            <Link to="/settings" title="Settings" style={{display: "flex", alignItems: "center"}}>
                <button><VscSettings className="navbar__icon" /></button>
            </Link>
        </form>
    );
}

export default Searchbar;
