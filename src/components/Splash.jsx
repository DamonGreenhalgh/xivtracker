import './Splash.css';
import aRealmRebornSplash from '../images/splash/a-realm-reborn.png';
import heavenswardSplash from '../images/splash/heavensward.png';
import stormbloodSplash from '../images/splash/stormblood.png';
import shadowbringersSplash from '../images/splash/shadowbringers.png';
import endwalkerSplash from '../images/splash/endwalker.png';

const splashes = [
    '',
    aRealmRebornSplash,
    heavenswardSplash,
    stormbloodSplash,
    shadowbringersSplash,
    endwalkerSplash
]

const Splash = (props) => {
    
    return(
        <div className='splash' style={{backgroundImage: 'url(' + splashes[props.index] + ')'}}/>
    );
}

export default Splash;