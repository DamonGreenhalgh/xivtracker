import './App.css';
import './utility.css';
import Home from './pages/Home';
import Character from './pages/Character';
import Settings from './pages/Settings';
import { 
  BrowserRouter,
  Routes,
  Route  
} from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import themesJSON from './data/themes.json';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const [theme, setTheme] = useState('light');

  // Function to set the theme of the web app.
  const applyTheme = () => {
    const keys = Object.keys(themesJSON[theme].colors);
    const values = Object.values(themesJSON[theme].colors);
    for (let i = 0; i < keys.length; i++) {
      document.documentElement.style.setProperty(keys[i], values[i]);
    }
    console.log(theme);
    localStorage.setItem("theme", theme);
  }

  // Load settings from local storage
  useEffect(() => {    

    // Theme
    const localTheme = JSON.parse(localStorage.getItem('themes'))
    if (localTheme !== null) {
      console.log(localTheme);
      setTheme(localTheme)
    }
    
  }, [])

  // Apply new theme when theme state variable is updated.
  useEffect(() => {
    applyTheme();
  }, [theme])

  return (
    <BrowserRouter basename="/xivtracker">
      <Navbar noSearchbar={true} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/character/:id" element={<Character />} />
        <Route path="/settings" element={<Settings theme={theme} setTheme={setTheme} />} />
      </Routes>
      <Footer />
    </BrowserRouter>  
  );
}

export default App;
