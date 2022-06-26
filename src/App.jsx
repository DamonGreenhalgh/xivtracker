
// Hooks
import { useEffect, useState } from 'react';

// Components
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './containers/Home';
import Character from './containers/Character';
import Settings from './containers/Settings';
import Help from './containers/Help';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Loading from './components/Loading';

// Data
import themesJSON from './data/themes.json';
import settingsJSON from './data/settings.json';

// Styles
import './styles/App.css';
import './styles/utility.css';

// Assets
import darkARealmRebornSplash from './images/splash/dark/a-realm-reborn.png';
import darkHeavenswardSplash from './images/splash/dark/heavensward.png';
import darkStormbloodSplash from './images/splash/dark/stormblood.png';
import darkShadowbringersSplash from './images/splash/dark/shadowbringers.png';
import darkEndwalkerSplash from './images/splash/dark/endwalker.png';
import lightARealmRebornSplash from './images/splash/light/a-realm-reborn.png';
import lightHeavenswardSplash from './images/splash/light/heavensward.png';
import lightStormbloodSplash from './images/splash/light/stormblood.png';
import lightShadowbringersSplash from './images/splash/light/shadowbringers.png';
import lightEndwalkerSplash from './images/splash/light/endwalker.png';

const splashes = {
  'dark': [
    '',
    darkARealmRebornSplash,
    darkHeavenswardSplash,
    darkStormbloodSplash,
    darkShadowbringersSplash,
    darkEndwalkerSplash
  ],
  'light': [
    '',
    lightARealmRebornSplash,
    lightHeavenswardSplash,
    lightStormbloodSplash,
    lightShadowbringersSplash,
    lightEndwalkerSplash
  ]
}

const App = () => {
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [loading, setLoading] = useState(true);

  // Settings
  const [theme, setTheme] = useState(settingsJSON.theme);
  const [splash, setSplash] = useState(settingsJSON.splash);
  const [personalized, setPersonalized] = useState(settingsJSON.personalized);
  const [referenceCharacter, setReferenceCharacter] = useState(null);

  // Mount
  useEffect(() => { 

    // Local storage display for testing.
    // for (let i = 0; i < localStorage.length; i++)   {
    //   console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    // }

    // Load settings from local storage if they exist
    const localSettings = JSON.parse(localStorage.getItem('settings'));
    if (localSettings !== null) {
      setTheme(localSettings.theme);
      setSplash(localSettings.splash);
      setPersonalized(localSettings.personalized);
      setReferenceCharacter(localSettings.referenceData);
    }
    
    setLoading(false);
    
  }, [])


  // Update
  useEffect(() => {

    document.body.style.backgroundImage = "url(" + splashes[theme][splash] + ")";
    const keys = Object.keys(themesJSON[theme].colors);
    const values = Object.values(themesJSON[theme].colors);
    for (let i = 0; i < keys.length; i++) {
      document.documentElement.style.setProperty(keys[i], values[i]);
    }

    localStorage.setItem('settings', JSON.stringify({
      "theme": theme,
      "splash": splash,
      "personalized": personalized,
      "referenceData": referenceCharacter
    }));

  }, [theme, splash, referenceCharacter, personalized])

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {
        loading ?
        <Loading full={true} /> :
        <>
          <Navbar 
            showSearchbar={showSearchbar} 
            referenceCharacter={referenceCharacter} 
          />
          <Routes>
            <Route 
              exact path="/:id" 
              element={
                <Character 
                  setShowSearchbar={setShowSearchbar} 
                  referenceCharacter={referenceCharacter}
                  setLoading={setLoading}
                />
              } 
            />
            <Route 
              path="/settings" 
              element={
                <Settings 
                  setShowSearchbar={setShowSearchbar} 
                  theme={theme} 
                  setTheme={setTheme} 
                  referenceCharacter={referenceCharacter}
                  setReferenceCharacter={setReferenceCharacter}
                  splash={splash}
                  setSplash={setSplash}
                  personalized={personalized}
                  setPersonalized={setPersonalized}
                />
              } 
            />
            <Route 
              path="/help"
              element={
                <Help 
                  setShowSearchbar={setShowSearchbar} 
                />
              }
            />
            <Route 
              path="/" 
              element={
                <Home 
                  setShowSearchbar={setShowSearchbar} 
                />
              } 
            />
          </Routes>
          <Footer/>
        </>
      }
    </BrowserRouter>  
  );
}

export default App;
