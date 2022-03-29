import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import Banner from '../components/Banner';
import Notice from '../components/Notice';
import Splash from '../components/Splash';
import Featured from '../components/Featured';
import Loading from '../components/utility/Loading';
import brandIcon from '../images/brand-extended.png';
import './Home.css';

const Home = (props) =>  {
    const [results, setResults] = useState(null);
    const [noticeType, setNoticeType] = useState(0);
    const [displayNotice, setDisplayNotice] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    // Function to request a character search from xivapi.com.
    const searchCharacter = async (name, server) => {
        setIsLoading(true);
        setResults(null);

        // If serverlist value was left on default, set to "" for the GET request.
        let currentServer = "";
        if (server !== "Server") { currentServer = server; }

        // Fetch character search for xivapi.com.
        await fetch("https://xivapi.com/character/search?name="+ name + "&server=" + currentServer, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                setDisplayNotice(true);
                if (data.Results.length == 0) {
                    setNoticeType(3);
                } else {

                    // Create character banners for each valid returned character.
                    setResults([data.Results.map(result => (
                        <Banner 
                        isDisabled={false}
                        type="search"
                        name={result.Name}
                        isPrefix={false}
                        title={result.Server}
                        avatar={result.Avatar}
                        id={result.ID}
                        key={result.ID}
                        />
                    ))])
                    setNoticeType(1);
                }
            });
            setIsLoading(false);
    }

    // On page load, check if there are url search parameters.
    // If they exist, use them for the search.
    useEffect(() => {
        document.title = "XIV Tracker";
        const searchParams = new URLSearchParams(window.location.search);
        const urlName = searchParams.get('name');
        const urlServer = searchParams.get('server');
        if (urlName !== null) { searchCharacter(urlName, urlServer); }

        // Set new content width
        document.documentElement.style.setProperty('--content-width', '30rem');

        // Disable searchbar on navbar.
        props.setShowSearchbar(false);
    }, []);

    return (
        isLoading ?
        <Loading /> :
        <div className="home" style={displayNotice ? {height: "auto"} : {height: 'calc(100vh - 16rem)'}}>
            <Notice type={0} show={true} />
            <Splash />
            <img 
                src={brandIcon}
                className="home__brand"
                alt="Brand Logo" 
            />
            <Searchbar search={searchCharacter} />
            {results}
            <Notice type={noticeType} show={displayNotice} />                
            <Featured />
        </div>
    );
}

export default Home;