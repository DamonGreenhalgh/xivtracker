// Hooks
import { useState } from 'react';
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
    const [index, setIndex] = useState(0);

    return (
        

        <div className={'section' + (props.display ? '' : ' disabled')}>
            {
                loading ?
                <>
                    <Header 
                        name="Achievements"
                        minor="Points"
                        major="0"
                    />
                    <Loading /> 
                </> :
                <>
                    <Header 
                        name='Achievements'
                        minor='Points'
                        major={data.Achievements.Points}
                    />
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
                    <Navigator 
                        update={setIndex} 
                        current={index} 
                        min={0} 
                        max={Math.ceil(data.Achievements.List.length / capacity) - 1}
                        style={{margin: 'auto'}} 
                     />
                </>
            }
            
        </div>
    );
}

export default Achievements;