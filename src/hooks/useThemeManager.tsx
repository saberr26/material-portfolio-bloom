
import { useState, useEffect } from 'react';

const themes = [
  'material-theme-1', // Purple/Blue
  'material-theme-2', // Cyan/Blue  
  'material-theme-3', // Green/Yellow
  'material-theme-4', // Pink/Green
  'material-theme-5', // Orange/Red
  'material-theme-6', // Blue/Purple
  'material-theme-7', // Teal/Orange
  'material-theme-8'  // Rose/Blue
];

// Material You color definitions for the 3D background
export const materialThemes = {
  'material-theme-1': {
    colors: {
      primary: '#7c4dff',
      primaryContainer: '#b388ff',
      secondary: '#3f51b5',
      tertiaryContainer: '#9c27b0'
    }
  },
  'material-theme-2': {
    colors: {
      primary: '#00bcd4',
      primaryContainer: '#4dd0e1',
      secondary: '#2196f3',
      tertiaryContainer: '#9c27b0'
    }
  },
  'material-theme-3': {
    colors: {
      primary: '#4caf50',
      primaryContainer: '#81c784',
      secondary: '#8bc34a',
      tertiaryContainer: '#ffeb3b'
    }
  },
  'material-theme-4': {
    colors: {
      primary: '#e91e63',
      primaryContainer: '#f48fb1',
      secondary: '#ff5722',
      tertiaryContainer: '#4caf50'
    }
  },
  'material-theme-5': {
    colors: {
      primary: '#ff9800',
      primaryContainer: '#ffcc02',
      secondary: '#f44336',
      tertiaryContainer: '#ff5722'
    }
  },
  'material-theme-6': {
    colors: {
      primary: '#2196f3',
      primaryContainer: '#64b5f6',
      secondary: '#673ab7',
      tertiaryContainer: '#3f51b5'
    }
  },
  'material-theme-7': {
    colors: {
      primary: '#009688',
      primaryContainer: '#4db6ac',
      secondary: '#00acc1',
      tertiaryContainer: '#ff9800'
    }
  },
  'material-theme-8': {
    colors: {
      primary: '#e91e63',
      primaryContainer: '#f8bbd9',
      secondary: '#2196f3',
      tertiaryContainer: '#9c27b0'
    }
  }
};

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
    // Cycle through themes every 45 seconds
    const interval = setInterval(() => {
      const nextIndex = (themeIndex + 1) % themes.length;
      setThemeIndex(nextIndex);
      setCurrentTheme(themes[nextIndex]);
      document.documentElement.className = themes[nextIndex];
    }, 45000);

    return () => clearInterval(interval);
  }, [themeIndex]);

  const switchTheme = (index?: number) => {
    const newIndex = index !== undefined ? index : (themeIndex + 1) % themes.length;
    setThemeIndex(newIndex);
    setCurrentTheme(themes[newIndex]);
    document.documentElement.className = themes[newIndex];
  };

  const getCurrentThemeData = () => {
    return materialThemes[currentTheme as keyof typeof materialThemes];
  };

  return { currentTheme, switchTheme, themeIndex, getCurrentThemeData };
};
