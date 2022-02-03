import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import '../components/Banner.css';
import './Home.css';
import brandIcon from '../images/brand-extended.png';
import loadingIcon from '../images/loading.svg';
import Notice from '../components/Notice';

const Home = () =>  {

    const [results, setResults] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [textContent, setTextContent] = useState(false);
    const [showNotice, setShowNotice] = useState(false);

    // Function to request a character search from xivapi.com.
    const searchCharacter = async (name, server) => {
        setIsLoading(true);
        setResults(null);
        setShowNotice(false);
        let currentServer = "";
        if (server !== "Server") { currentServer = server; }
        await fetch("https://xivapi.com/character/search?name=" + name + "&server=" + currentServer, {mode: 'cors'})
            .then(response => response.json())
            .then(data => {
                if (data.Results.length == 0) {
                    setTextContent("Did not find any characters by the name of '" + name + "'");
                } else {
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
                    setTextContent("Didn't find what you were looking for? Search with full name and server!");
                }
                setShowNotice(true);
            });
            setIsLoading(false);
    }

    // On page load, check if there are url search parameters, if there are
    // use them for the search.
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const urlName = searchParams.get('name');
        const urlServer = searchParams.get('server');
        if (urlName !== null) { searchCharacter(urlName, urlServer); }
    }, []);

    return (
        <>  
            <div className="home">
                <img 
                src={brandIcon}
                className="icon--home"
                alt="Brand Logo" 
                />
                <Searchbar search={searchCharacter} isHome={true} />
                {results}
                <img 
                src={loadingIcon}
                className={isLoading ? "icon--mid" : "disabled"}
                alt="Loading Icon"
                />
                <Notice
                text={<p className="notice-text">{textContent}</p>}
                show={showNotice}
                />
            </div>
            <Footer isHome={true}/>
        </>
    );
}

export default Home;