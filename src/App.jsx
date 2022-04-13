
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Character from './pages/Character';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Splash from './components/Splash';
import Loading from './components/utility/Loading';
import themesJSON from './data/themes.json';
import './App.css';
import './components/utility/utility.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [splash, setSplash] = useState(5);
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [referenceCharacter, setReferenceCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mount
  useEffect(async () => { 

    // Local storage display for testing.
    for (let i = 0; i < localStorage.length; i++)   {
      console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
    }

    // Load theme saved in local storage if it exists.
    const localTheme = localStorage.getItem('theme')
    if (localTheme !== null) {
      setTheme(localTheme);
    }

    // Load splash
    const localSplash = localStorage.getItem('splash');
    if (localSplash !== null) {
      setSplash(localSplash);
    }

    // Load referenceCharacter id, request data for character.
    const id = localStorage.getItem('id');
    if (id !== null) {
      await fetch("https://xivapi.com/character/" + id + "?extended=1&data=AC", {mode: 'cors'})
        .then(response => response.json())
        .then(data => setReferenceCharacter(data));
    }
    
    setLoading(false);
    
  }, [])


  // Update
  useEffect(() => {

    localStorage.setItem("theme", theme);
    localStorage.setItem('splash', splash);

    const keys = Object.keys(themesJSON[theme].colors);
    const values = Object.values(themesJSON[theme].colors);
    for (let i = 0; i < keys.length; i++) {
      document.documentElement.style.setProperty(keys[i], values[i]);
    }

  }, [theme, splash])

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
      <Splash index={splash} />
    </BrowserRouter>  
  );
}

export default App;
