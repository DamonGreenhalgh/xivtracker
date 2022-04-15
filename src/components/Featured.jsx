import './Featured.css';
import endwalkerBanner from '../images/featured/endwalker.png';
import newfoundAdventureBanner from '../images/featured/newfound-adventure.png';
import littleLadiesDayBanner from '../images/featured/little-ladies-day.png';
import moogleTreasureTroveBanner from '../images/featured/moogle-treasure-trove.png';
import hatchingTideBanner from '../images/featured/hatching-tide.png';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import featureJSON from '../data/feature.json';


// Reference to currently live events/relevant content.
const live = [
    'event2',
    '6.1',
    '6.0'
]

const Featured = () => {

    const length = live.length;
    const backgroundContainer = useRef(null);
    const [index, setIndex] = useState(0);
    const [auto, setAuto] = useState(true);

    // Update index function to keep the index within [0, length]
    const updateIndex = (direction) => {
        setIndex(index => {
            // If index would fall below 0, wrap around.
            if (index + direction < 0) {
                return length - 1;
            }
            return (index + direction) % length;
        });
    }

    useEffect(() => {
        const interval = setInterval(() => {
            updateIndex(1);
        }, 3500);

        // Disable auto scroll if the user has interacted with slideshow.
        if (!auto) { clearInterval(interval) }

        return () => clearInterval(interval);
    }, [auto])

    useEffect(() => {
        backgroundContainer.current.style.transform = "translate(-" + index * 30 + "rem, 0)";
    }, [index])
    
    return(
        <div className="featured">
            <div className="featured__overlay">
                <button 
                    className="arrow arrow--left" 
                    onClick={() => {updateIndex(-1); setAuto(false)}}
                >
                    <FaChevronLeft />
                </button>
                <a href={featureJSON[live[index]].link} />                    
                <h4>{featureJSON[live[index]].type}</h4>
                <div className='col text-end' style={{
                    position: 'absolute',
                    bottom: '1rem',
                    right: '1rem'
                }}>
                    <p>{featureJSON[live[index]].date}</p>
                    <h2>{featureJSON[live[index]].title}</h2>

                </div>
                
                <button 
                    className="arrow arrow--right" 
                    onClick={() => {updateIndex(1); setAuto(false)}}
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="featured__banners" ref={backgroundContainer} >
                <img src={hatchingTideBanner} />
                <img src={newfoundAdventureBanner} />
                <img src={endwalkerBanner} />
            </div>
        </div>
    );
}

export default Featured;