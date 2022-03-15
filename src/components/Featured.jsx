import './Featured.css';
import endwalkerBanner from '../images/featured/endwalker.png';
import newfoundAdventureBanner from '../images/featured/newfound-adventure.png';
import littleLadiesDayBanner from '../images/featured/little-ladies-day.png';
import moogleTreasureTroveBanner from '../images/featured/moogle-treasure-trove.png';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const feature = {
    0: {
        title: "ENDWALKER",
        prefix: "Latest Expansion",
        link: "https://na.finalfantasyxiv.com/endwalker"
    },
    1: {
        title: "NEWFOUND ADVENTURE",
        prefix: "Upcoming Patch",
        link: "https://na.finalfantasyxiv.com/endwalker/patch_6_1/"
    },
    2: {
        title: "LITTLE LADIES' DAY",
        prefix: "Live Event",
        link: "https://na.finalfantasyxiv.com/lodestone/special/2022/Little_Ladies_Day/jsuk7gn8z4"
    },
    3: {
        title: "MOOGLE TREASURE TROVE",
        prefix: "Live Event",
        link: "https://na.finalfantasyxiv.com/lodestone/special/mogmog-collection/202203/dceh8sj926"
    }
}

const Featured = () => {

    const length = Object.keys(feature).length;
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
                    className="arrow" 
                    onClick={() => {updateIndex(-1); setAuto(false)}}
                >
                    <FaChevronLeft />
                </button>
                <a className="text" href={feature[index].link}>
                    <p>{feature[index].prefix}</p>
                    <h2>{feature[index].title}</h2>
                </a>
                <button 
                    className="arrow" 
                    onClick={() => {updateIndex(1); setAuto(false)}}
                >
                    <FaChevronRight />
                </button>
            </div>
            <div className="featured__banners" ref={backgroundContainer} >
                <img src={endwalkerBanner} />
                <img src={newfoundAdventureBanner} />
                <img src={littleLadiesDayBanner} />
                <img src={moogleTreasureTroveBanner} />
            </div>
        </div>
    );
}

export default Featured;