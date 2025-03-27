import React, { createContext, useContext, useState, useEffect } from "react";
import { ColorScheme, FontOption, ThemeSettings } from "../lib/types";

// Default color schemes
const colorSchemes: ColorScheme[] = [
  {
    id: "blue-orange",
    primary: "#3b82f6",
    secondary: "#f97316",
    bgColor: "#ffffff",
    textColor: "#1f2937"
  },
  {
    id: "green-purple",
    primary: "#10b981",
    secondary: "#8b5cf6",
    bgColor: "#ffffff",
    textColor: "#1f2937"
  },
  {
    id: "purple-pink",
    primary: "#8b5cf6",
    secondary: "#ec4899",
    bgColor: "#ffffff",
    textColor: "#1f2937"
  },
  {
    id: "red-blue",
    primary: "#ef4444",
    secondary: "#3b82f6",
    bgColor: "#ffffff",
    textColor: "#1f2937"
  }
];

// Font options
const fontOptions: FontOption[] = [
  {
    id: "serif-body",
    heading: "Inter",
    body: "Source Serif Pro",
    name: "Serif Body (Default)"
  },
  {
    id: "sans-all",
    heading: "Inter",
    body: "Inter",
    name: "Sans Serif All"
  },
  {
    id: "serif-all",
    heading: "Source Serif Pro",
    body: "Source Serif Pro",
    name: "Serif All"
  }
];

// Default theme settings
const defaultTheme: ThemeSettings = {
  layout: "sidebar-right",
  colorScheme: colorSchemes[0],
  font: fontOptions[0]
};

interface ThemeContextType {
  themeSettings: ThemeSettings;
  colorSchemes: ColorScheme[];
  fontOptions: FontOption[];
  updateLayout: (layout: string) => void;
  updateColorScheme: (schemeId: string) => void;
  updateFont: (fontId: string) => void;
  isCustomizerOpen: boolean;
  toggleCustomizer: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>(defaultTheme);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);

  // Apply theme settings to CSS variables
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', themeSettings.colorScheme.primary);
    document.documentElement.style.setProperty('--secondary-color', themeSettings.colorScheme.secondary);
    document.documentElement.style.setProperty('--background-color', themeSettings.colorScheme.bgColor);
    document.documentElement.style.setProperty('--text-color', themeSettings.colorScheme.textColor);
    
    // Apply font settings
    document.documentElement.style.setProperty('--heading-font', themeSettings.font.heading);
    document.documentElement.style.setProperty('--body-font', themeSettings.font.body);
  }, [themeSettings]);

  const updateLayout = (layout: string) => {
    setThemeSettings(prev => ({ ...prev, layout }));
  };

  const updateColorScheme = (schemeId: string) => {
    const scheme = colorSchemes.find(s => s.id === schemeId) || colorSchemes[0];
    setThemeSettings(prev => ({ ...prev, colorScheme: scheme }));
  };

  const updateFont = (fontId: string) => {
    const font = fontOptions.find(f => f.id === fontId) || fontOptions[0];
    setThemeSettings(prev => ({ ...prev, font }));
  };

  const toggleCustomizer = () => {
    setIsCustomizerOpen(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{
      themeSettings,
      colorSchemes,
      fontOptions,
      updateLayout,
      updateColorScheme,
      updateFont,
      isCustomizerOpen,
      toggleCustomizer
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
