// Hooks
import { useEffect, useState } from 'react';
import { useFetchData } from '../hooks/useFetchData';

// Components
import Achievement from '../components/Achievement';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Navigator from '../components/Navigator';

// Style
import '../styles/Achievements.css';

/**
 * @name Achievements
 * @description Container for character achievements.
 * @param {*} props 
 * @returns 
 */
const Achievements = (props) => {

    const capacity = 8;
    const {data, loading} = useFetchData("https://xivapi.com/character/" + props.data.ID + "?extended=1&data=AC");
    const [content, setContent] = useState(null);
    const [index, setIndex] = useState(0);

    // Update
    useEffect(() => {
        if (!loading) {
            setContent(
                <ul className='col gap'>
                    {(data.Achievements.List.slice(index * capacity, (index + 1) * capacity)).map(achievement => 
                        <Achievement 
                            name={achievement.Name}
                            icon={achievement.Icon}
                            points={achievement.Points}
                            id={achievement.ID}
                            key={achievement.ID}
                        />
                    )}
                </ul>
            )
        }
    }, [index, loading]) 

    return (
        loading ?
        null :

        <div className={'section' + (props.display ? '' : ' disabled')}>
            <Header 
                name='Achievements'
                minor='Points'
                major={data.Achievements.Points}
            />
            {
                loading ?
                <Loading /> :
                content
            }
            <Navigator 
                update={setIndex} 
                current={index} 
                min={0} 
                max={Math.ceil(data.Achievements.List.length / capacity) - 1}
                style={{margin: 'auto'}} 
            />
        </div>
    );
}

export default Achievements;