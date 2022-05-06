import { useEffect, useState } from 'react';
import Searchbar from '../components/Searchbar';
import Banner from '../components/Banner';
import Featured from '../components/Featured';
import Loading from '../components/utility/Loading';
import brandIcon from '../images/brand-extended.png';
import './Home.css';

const Home = (props) =>  {
    const [results, setResults] = useState(null);
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
                // Create character banners for each valid returned character.
                setResults([data.Results.map(result => (
                    <Banner 
                    type='search'
                    name={result.Name}
                    misc={result.Server}
                    avatar={<img src={result.Avatar} className='rounded' />}
                    link={"/" + result.ID}
                    key={result.ID}
                    />
                ))])
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
        console.log(results==null);
    }, []);

    return (
        <div className="home" style={results==null ? {height: 'calc(100vh - 16rem)'} : {height: "auto"}}>
            <img 
                src={brandIcon}
                className="home__brand"
                alt="Brand Logo" 
            />
            {
                isLoading ?
                <Loading /> :
                <Searchbar search={searchCharacter} />
            }
            {results}
            <Featured />
        </div>
    );
}

export default Home;