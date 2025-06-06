
import { useState, useEffect } from 'react';

const themes = [
  'material-theme-1',
  'material-theme-2', 
  'material-theme-3',
  'material-theme-4'
];

export const useThemeManager = () => {
  const [currentTheme, setCurrentTheme] = useState(themes[0]);
  const [themeIndex, setThemeIndex] = useState(0);

  useEffect(() => {
    // Set initial random theme on load
    const randomIndex = Math.floor(Math.random() * themes.length);
    setThemeIndex(randomIndex);
    setCurrentTheme(themes[randomIndex]);
    
    // Apply theme to document
    document.documentElement.className = themes[randomIndex];
  }, []);

  useEffect(() => {
    // Cycle through themes every 30 seconds
    const interval = setInterval(() => {
      const nextIndex = (themeIndex + 1) % themes.length;
      setThemeIndex(nextIndex);
      setCurrentTheme(themes[nextIndex]);
      document.documentElement.className = themes[nextIndex];
    }, 30000);

    return () => clearInterval(interval);
  }, [themeIndex]);

  const switchTheme = (index?: number) => {
    const newIndex = index !== undefined ? index : (themeIndex + 1) % themes.length;
    setThemeIndex(newIndex);
    setCurrentTheme(themes[newIndex]);
    document.documentElement.className = themes[newIndex];
  };

  return { currentTheme, switchTheme, themeIndex };
};
