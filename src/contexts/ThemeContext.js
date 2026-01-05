'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const themes = {
  dark: {
    name: 'Dark',
    colors: {
      primary: '#0a1128',      // Navy foncé
      secondary: '#1e3a5f',    // Bleu accent
      accent: '#d4af37',       // Or
      background: '#0f172a',   // Fond sombre
      foreground: '#f8fafc',   // Texte clair
    }
  },
  light: {
    name: 'Light',
    colors: {
      primary: '#1e40af',      // Bleu
      secondary: '#3b82f6',    // Bleu clair
      accent: '#f59e0b',       // Orange
      background: '#ffffff',   // Blanc
      foreground: '#1f2937',   // Texte foncé
    }
  },
  ocean: {
    name: 'Ocean',
    colors: {
      primary: '#0c4a6e',      // Bleu océan foncé
      secondary: '#0284c7',    // Bleu océan
      accent: '#06b6d4',       // Cyan
      background: '#082f49',   // Fond bleu foncé
      foreground: '#e0f2fe',   // Texte bleu clair
    }
  },
  purple: {
    name: 'Purple',
    colors: {
      primary: '#581c87',      // Violet foncé
      secondary: '#7e22ce',    // Violet
      accent: '#c084fc',       // Violet clair
      background: '#1e1b4b',   // Fond violet foncé
      foreground: '#f5f3ff',   // Texte violet clair
    }
  },
  forest: {
    name: 'Forest',
    colors: {
      primary: '#14532d',      // Vert forêt foncé
      secondary: '#166534',    // Vert forêt
      accent: '#84cc16',       // Vert lime
      background: '#052e16',   // Fond vert foncé
      foreground: '#f0fdf4',   // Texte vert clair
    }
  },
  sunset: {
    name: 'Sunset',
    colors: {
      primary: '#7c2d12',      // Rouge-orange foncé
      secondary: '#dc2626',    // Rouge
      accent: '#fb923c',       // Orange
      background: '#450a0a',   // Fond rouge foncé
      foreground: '#fef2f2',   // Texte rose clair
    }
  }
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('cosma-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    // Appliquer les variables CSS
    const theme = themes[currentTheme];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-foreground', theme.colors.foreground);

    // Sauvegarder le choix
    localStorage.setItem('cosma-theme', currentTheme);
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, changeTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
