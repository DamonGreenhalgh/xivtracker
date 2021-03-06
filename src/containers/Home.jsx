import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import Loading from '../components/Loading';
import brandIcon from '../images/brand-extended.png';
import '../styles/Home.css';

const Home = (props) =>  {
    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setShowSearchbar } = props;

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
                // Create character banners for each valid returned character.
                setResults(data.Results.map(result => (
                    <Banner 
                        type='search'
                        name={result.Name}
                        title={result.Server}
                        avatar={<img src={result.Avatar} className='rounded' alt="character avatar" />}
                        link={"/" + result.ID}
                        key={result.ID}
                    />
                )))
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
        setShowSearchbar(false);
    }, [setShowSearchbar]);

    return (
        <div className="home" style={results==null ? {height: 'calc(100vh - 16rem)'} : {height: "auto"}}>
            <img 
                src={brandIcon}
                className="home__brand"
                alt="xiv tracker" 
            />
            {
                isLoading ?
                <Loading /> :
                <Searchbar search={searchCharacter} />
            }
            <Featured />
            <div className="col max-width gap">{results}</div>
        </div>
    );
}

export default Home;