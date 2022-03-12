import { useState }  from 'react';
import './Searchbar.css';
import searchLogo from '../images/search.png';
import { FaSearch } from 'react-icons/fa';

const Searchbar = (props) => {

    const [name, setName] = useState("");
    const [server, setServer] = useState("Server");

    const onChange = (event) => {
        const value = event.target.value;
        if (event.target.name == "name") {
            setName(value);
        } else {
            setServer(value);
        }
    }

    const callbackMethod = (event) => {
        event.preventDefault();
        props.search(name, server);
    }

    return (
        <form className={props.isSearching ? "disabled" : "searchbar"} onSubmit={callbackMethod} autoComplete="off">
            <select className='searchbar__server-list searchbar__component' value={server} onChange={onChange} name="server" autoComplete="false">
                <option>Server</option>
                <option>Adamantoise</option>
                <option>Aegis</option>
                <option>Alexander</option>
                <option>Anima</option>
                <option>Asura</option>
                <option>Atomos</option>
                <option>Bahamut</option>
                <option>Balmung</option>
                <option>Behemoth</option>
                <option>Belias</option>
                <option>Brynhildr</option>
                <option>Cactuar</option>
                <option>Carbuncle</option>
                <option>Cerberus</option>
                <option>Chocobo</option>
                <option>Coeurl</option>
                <option>Diabolos</option>
                <option>Durandal</option>
                <option>Excalibur</option>
                <option>Exodus</option>
                <option>Faerie</option>
                <option>Famfrit</option>
                <option>Fenrir</option>
                <option>Garuda</option>
                <option>Gilgamesh</option>
                <option>Goblin</option>
                <option>Gungnir</option>
                <option>Hades</option>
                <option>Hyperion</option>
                <option>Ifrit</option>
                <option>Ixion</option>
                <option>Jenova</option>
                <option>Kujata</option>
                <option>Lamia</option>
                <option>Leviathan</option>
                <option>Lich</option>
                <option>Louisoix</option>
                <option>Malboro</option>
                <option>Mandragora</option>
                <option>Masamune</option>
                <option>Mateus</option>
                <option>Midgardsormr</option>
                <option>Moogle</option>
                <option>Odin</option>
                <option>Omega</option>
                <option>Pandaemonium</option>
                <option>Phoenix</option>
                <option>Ragnarok</option>
                <option>Ramuh</option>
                <option>Ridill</option>
                <option>Sargatanas</option>
                <option>Shinryu</option>
                <option>Shiva</option>
                <option>Siren</option>
                <option>Tiamat</option>
                <option>Titan</option>
                <option>Tonberry</option>
                <option>Typhon</option>
                <option>Ultima</option>
                <option>Ultros</option>
                <option>Unicorn</option>
                <option>Valefor</option>
                <option>Yojimbo</option>
                <option>Zalera</option>
                <option>Zeromus</option>
                <option>Zodiark</option>
                <option>Spriggan</option>
                <option>Twintania</option>
                <option>HongYuHai</option>
                <option>ShenYiZhiDi</option>
                <option>LaNuoXiYa</option>
                <option>HuanYingQunDao</option>
                <option>MengYaChi</option>
                <option>YuZhouHeYin</option>
                <option>WoXianXiRan</option>
                <option>ChenXiWangZuo</option>
                <option>BaiYinXiang</option>
                <option>BaiJinHuanXiang</option>
                <option>ShenQuanHen</option>
                <option>ChaoFengTing</option>
                <option>LvRenZhanQiao</option>
                <option>FuXiaoZhiJian</option>
                <option>Longchaoshendian</option>
                <option>MengYuBaoJing</option>
                <option>ZiShuiZhanQiao</option>
                <option>YanXia</option>
                <option>JingYuZhuangYuan</option>
                <option>MoDuNa</option>
                <option>HaiMaoChaWu</option>
                <option>RouFengHaiWan</option>
                <option>HuPoYuan</option>
            </select>
            <input
                type="text"
                className="text-box searchbar__component"
                placeholder="Name"
                value={name}
                onChange={onChange}
                name="name"
            >
            </input>
            <button className="searchbar__component searchbar__button">
                <FaSearch />
            </button>
        </form>
    );
}

export default Searchbar;
