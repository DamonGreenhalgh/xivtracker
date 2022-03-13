import reaperSplash from '../images/art/reaper.png';
import sageSplash from '../images/art/sage.png';

const splashes = {
    0: {
        src: reaperSplash,
        style: {
            top: "1rem",
            right: "calc(50vw + 10rem)"
        }
    },
    1: {
        src: sageSplash,
        style: {
            top: "0",
            left: "calc(50vw + 5rem)"
        }
    },
    length: 2
}

const Splash = () => {
    let index;
    if (sessionStorage.getItem("splash") === null) {
        index = Math.floor(Math.random() * splashes.length);  
        sessionStorage.setItem("splash", index);    
    } else {
        index = sessionStorage.getItem("splash")
    }
    return(
        <img src={splashes[index].src} style={splashes[index].style} className="splash" />
    );
}

export default Splash;