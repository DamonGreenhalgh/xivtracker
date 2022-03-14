import reaperSplash from '../images/splash/reaper.png';
import sageSplash from '../images/splash/sage.png';

const splashes = [
    reaperSplash,
    sageSplash
]

const Splash = () => {
    let index;
    if (sessionStorage.getItem("splash") === null) {
        index = Math.floor(Math.random() * splashes.length);  
        sessionStorage.setItem("splash", index);    
    } else {
        index = sessionStorage.getItem("splash")
    }
    return(
        <img src={splashes[index]} className="splash" />
    );
}

export default Splash;