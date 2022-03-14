import './Featured.css';
import endwalkerBanner from '../images/featured/endwalker.png';
import newfoundAdventureBanner from '../images/featured/newfound-adventure.png';
import littleLadiesDayBanner from '../images/featured/little-ladies-day.png';
import { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const feature = {
    0: {
        title: "6.0 ENDWALKER",
        prefix: "Current Expansion",
        link: "https://na.finalfantasyxiv.com/endwalker"
    },
    1: {
        title: "6.1 NEWFOUND ADVENTURE",
        prefix: "Upcoming Patch",
        link: "https://na.finalfantasyxiv.com/endwalker/patch_6_1/"
    },
    2: {
        title: "LITTLE LADIES' DAY",
        prefix: "Current Event",
        link: "https://na.finalfantasyxiv.com/lodestone/special/2022/Little_Ladies_Day/jsuk7gn8z4"
    },
    length: 3
}

const Featured = () => {
    const [title, setTitle] = useState(feature[0].title);
    const [prefix, setPrefix] = useState(feature[0].prefix);
    const [link, setLink] = useState(feature[0].link);
    const backgroundContainer = useRef(null);
    let i = 1;

    const [index, setIndex] = useState(0);

    useEffect(() => {
        setInterval(() => {
            setTitle(feature[i].title);
            setPrefix(feature[i].prefix);
            setLink(feature[i].link);
            backgroundContainer.current.style.transform = "translate(-" + i * 30 + "rem, 0)";
            if (i == feature.length - 1) {
                i = 0;
            } else {
                i++;
            }
        }, 5000);
    }, [])
    
    return(
        <a className="featured" href={link}>
            <div className="featured__arrows">
                <FaChevronLeft />
                <FaChevronRight />
            </div>
            <div className="overlay">
                <p>{prefix}</p>
                <h2>{title}</h2>
            </div>                
            <div className="featured__container" ref={backgroundContainer} >
                <img src={endwalkerBanner} />
                <img src={newfoundAdventureBanner} />
                <img src={littleLadiesDayBanner} />
            </div>
        </a>
    );
}

export default Featured;