import { useEffect, useState } from 'react';
import Header from './Header';
import Achievement from './Achievement';
import Loading from './utility/Loading';
import './Achievements.css';
import Navigator from './utility/Navigator';

const Achievements = (props) => {
    const [points, setPoints] = useState(0);
    const [achivementsContent, setAchievementsContent] = useState(null);
    const [achievementsPage, setAchievementsPage] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    const capacity = 8;

    // Mount
    useEffect(() => {
        const fetchData = async () => {
            await fetch("https://xivapi.com/character/" + props.data.ID + "?extended=1&data=AC", {mode: 'cors'})
                .then(response => response.json())
                .then(data => {
                    setPoints(data.Achievements.Points);
                    setData(data.Achievements.List);
                    setMaxPage(Math.ceil(data.Achievements.List.length / capacity) - 1)
                    setLoading(false);
            });
        }
        fetchData();
    }, [props.data.ID]);

    // Update
    useEffect(() => {
        if (!loading) {
            setAchievementsContent(
                <ul className='col gap'>
                    {(data.slice(achievementsPage * capacity, (achievementsPage + 1) * capacity)).map(achievement => 
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
        
    }, [achievementsPage, data, loading]) 

    return (
        <div className='section'>
            <Header 
                name='Achievements'
                minor='Points'
                major={points}
            />
            {
                loading ?
                <Loading /> :
                achivementsContent
            }
            <Navigator 
                update={setAchievementsPage} 
                current={achievementsPage} 
                min={0} 
                max={maxPage}
                style={{margin: 'auto'}} 
            />
        </div>
    );
}

export default Achievements;