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
  const [theme, setTheme] = useState("light");

  // Function to set the theme of the web app.
  const applyTheme = () => {
    const keys = Object.keys(themesJSON[theme].colors);
    const values = Object.values(themesJSON[theme].colors);
    for (let i = 0; i < keys.length; i++) {
      document.documentElement.style.setProperty(keys[i], values[i]);
    }
    localStorage.setItem("theme", theme);
  }

  // Load stored settings from local storage.
  useEffect(() => {
    console.log(localStorage.getItem("theme"));
    if (localStorage.getItem("theme") === null) {
      localStorage.setItem("theme", "light");
    } else {
      setTheme(() => localStorage.getItem("theme"))
    }
  }, [])

  // Apply new theme when theme state variable is updated.
  useEffect(() => {
    applyTheme();
  }, [theme])

  return (
    <BrowserRouter basename="/xivtracker">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<Character />} />
        <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;
