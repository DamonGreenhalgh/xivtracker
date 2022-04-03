
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'; 
import Home from './pages/Home';
import Character from './pages/Character';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import themesJSON from './data/themes.json';
import './App.css';
import './components/utility/utility.css';

const App = () => {
  const [theme, setTheme] = useState('light');
  const [showSearchbar, setShowSearchbar] = useState(false);
  const [referenceCharacter, setReferenceCharacter] = useState(null);

  // This function applies a color theme to the application.
  const applyTheme = () => {
    const keys = Object.keys(themesJSON[theme].colors);
    const values = Object.values(themesJSON[theme].colors);
    for (let i = 0; i < keys.length; i++) {
      document.documentElement.style.setProperty(keys[i], values[i]);
    }
    localStorage.setItem("theme", theme);
  }

  useEffect(() => {   
    
    // Load theme saved in local storage if it exists.
    const localTheme = localStorage.getItem('theme')
    if (localTheme !== null) {
      setTheme(localTheme)
    }

    // Load reference character
    const referenceCharacter = localStorage.getItem('reference');
    if (referenceCharacter !== null) {
      setReferenceCharacter(JSON.parse(referenceCharacter))
    }
    
  }, [])

  useEffect(() => {
    applyTheme();
  }, [theme])

  return (
    <BrowserRouter basename="/xivtracker">
      <Navbar 
        showSearchbar={showSearchbar} 
        referenceCharacter={referenceCharacter} 
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              setShowSearchbar={setShowSearchbar} 
            />
          } 
        />
        <Route 
          path="/:id/character" 
          element={
            <Character 
              setShowSearchbar={setShowSearchbar} 
            />
          } 
        />
        <Route 
          path="/settings" 
          element={
            <Settings 
              theme={theme} 
              setTheme={setTheme} 
              setShowSearchbar={setShowSearchbar} 
              setReferenceCharacter={setReferenceCharacter}
            />
          } 
        />
      </Routes>
      <Footer />
    </BrowserRouter>  
  );
}

export default App;
