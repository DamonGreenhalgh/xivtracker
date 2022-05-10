// Hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';

// Components
import Profile from '../containers/Profile';
import Jobs from '../containers/Jobs';
import Collection from '../containers/Collection';
import Quests from '../containers/Quests';
import Achievements from '../containers/Achievements';
import Loading from '../components/Loading';
import Banner from '../components/Banner';
import Button from '../components/Button';

// Style
import '../styles/Character.css';

/**
 * @name Character
 * @description This component represents the character profile page.
 * @param {*} props 
 * @returns 
 */
const Character = (props) => {

    const { id } = useParams();
    const {data, loading} = useFetchData("https://xivapi.com/character/" + id + "?extended=1&data=FC");
    const [index, setIndex] = useState(0);

    useEffect(() => {

        /**
         * @name storeRecent
         * @description This function stores recently viewed characters into local
         * storage to be viewed later.
         * @param {*} data A JSON object from XIVAPI 
         */
        const storeRecent = (data) => {

            // Define new character object.
            const character = {
                name: data.Name,
                avatar: data.Avatar,
                id: data.ID,
                server: data.Server
            }

            // Retrieve 'recent' variable from local storage.
            let recent = JSON.parse(localStorage.getItem("recent"));

            // First time user, create recent array.
            if (recent === null) {
                recent = [];
            }

            // Check if the character is in the recent array, if it is, remove it.
            for (let i = 0; i < recent.length; i++) {
                if (recent[i].id === character.id) {
                    recent.splice(i, 1);
                }
            }

            // Add character to the front of the array. Indicates most recently
            // viewed character.
            recent.unshift(character);

            // If recent array is at max capacity, remove the last element.
            if (recent.length > 6) {
                recent.pop();
            }

            // Store 'recent' back into local storage.
            localStorage.setItem("recent", JSON.stringify(recent));
        }

        props.setShowSearchbar(true);
        document.documentElement.style.setProperty('--content-width', '70rem');
        if (!loading) {
            document.title = "XIV Tracker | " + data.Character.Name;
            storeRecent(data.Character);
        }
        
    }, [loading]);

    return (
        loading ?
        <Loading full={true} /> :

        <div className="character">
            <Banner
                type=''
                avatar={<img src={data.Character.Avatar} className='rounded' alt="Character Avatar"/>}
                name={data.Character.Name}
                title={data.Character.Title.Name}
                misc={data.Character.Server}
            />
            <nav className='character__nav'>
                <Button 
                    content="Profile" 
                    onClick={() => setIndex(0)} 
                    condition={index === 0} 
                />
                <Button 
                    content="Jobs" 
                    onClick={() => setIndex(1)} 
                    condition={index === 1} 
                />
                <Button 
                    content="Collection" 
                    onClick={() => setIndex(2)} 
                    condition={index === 2} 
                />
                <Button 
                    content="Quests" 
                    onClick={() => setIndex(3)} 
                    condition={index === 3} 
                />
                <Button 
                    content="Achievements" 
                    onClick={() => setIndex(4)} 
                    condition={index === 4} 
                />
            </nav>
            <Profile 
                display={index === 0}
                data={data}
            />
            <Jobs 
                display={index === 1}
                jobs={data.Character.ClassJobs} 
            />
            <Collection 
                display={index === 2}
                id={id}
            />
            <Quests 
                display={index === 3}
                id={id}
                referenceCharacter={props.referenceCharacter}
            />
            <Achievements 
                display={index === 4} 
                data={data.Character}
            />
        </div>
    );
}

export default Character;