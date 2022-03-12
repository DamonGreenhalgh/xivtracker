import './App.css';
import Home from './pages/Home';
import Character from './pages/Character';
import Settings from './pages/Settings';
import { 
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import themesJSON from './themes.json';

const App = () => {
  const [themeIndex, setThemeIndex] = useState(0);

  // Function to set the theme of the web app.
  const setTheme = () => {
    const keys = Object.keys(themesJSON[themeIndex].colors);
    const values = Object.values(themesJSON[themeIndex].colors);
    for (let i = 0; i < keys.length; i++) {
    document.documentElement.style.setProperty(keys[i], values[i]);
    }
  }

  useEffect(() => {

    // Check local storage to see if a theme has already been set.
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", 0);
    } else {
      setThemeIndex(() => localStorage.getItem("theme"))
    }
    
    setTheme(themeIndex);
  }, [themeIndex])

  return (
    <BrowserRouter basename="/xivtracker">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/settings" element={<Settings themeIndex={themeIndex} setThemeIndex={setThemeIndex} />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
