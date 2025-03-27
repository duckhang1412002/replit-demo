import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  theme: ThemeSettings;
  updateTheme: (settings: Partial<ThemeSettings>) => void;
  resetTheme: () => void;
}

export interface ThemeSettings {
  primaryColor: string;
  fontFamily: string;
  fontSize: number;
  layout: string;
  mode: string;
}

const defaultTheme: ThemeSettings = {
  primaryColor: "#3B82F6", // blue-500
  fontFamily: "inter",
  fontSize: 2, // medium (0-4 scale)
  layout: "standard",
  mode: "light"
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
  resetTheme: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage if available, otherwise use default
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const savedTheme = localStorage.getItem("creator-canvas-theme");
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  // Update theme settings
  const updateTheme = (settings: Partial<ThemeSettings>) => {
    setTheme(prevTheme => {
      const newTheme = { ...prevTheme, ...settings };
      localStorage.setItem("creator-canvas-theme", JSON.stringify(newTheme));
      return newTheme;
    });
  };

  // Reset to default theme
  const resetTheme = () => {
    localStorage.removeItem("creator-canvas-theme");
    setTheme(defaultTheme);
  };

  // Apply theme settings to document
  useEffect(() => {
    // Apply font family
    if (theme.fontFamily === "roboto") {
      document.documentElement.style.setProperty("--font-family", "'Roboto', sans-serif");
      if (!document.getElementById("roboto-font")) {
        const link = document.createElement("link");
        link.id = "roboto-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap";
        document.head.appendChild(link);
      }
    } else if (theme.fontFamily === "opensans") {
      document.documentElement.style.setProperty("--font-family", "'Open Sans', sans-serif");
      if (!document.getElementById("opensans-font")) {
        const link = document.createElement("link");
        link.id = "opensans-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap";
        document.head.appendChild(link);
      }
    } else if (theme.fontFamily === "lato") {
      document.documentElement.style.setProperty("--font-family", "'Lato', sans-serif");
      if (!document.getElementById("lato-font")) {
        const link = document.createElement("link");
        link.id = "lato-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap";
        document.head.appendChild(link);
      }
    } else {
      // Default to Inter + Merriweather
      document.documentElement.style.setProperty("--font-family", "");
    }

    // Apply font size
    const fontSizes = ["0.875rem", "0.925rem", "1rem", "1.075rem", "1.125rem"];
    document.documentElement.style.setProperty("--font-size-base", fontSizes[theme.fontSize]);

    // Apply color theme
    const primaryColorHsl = theme.primaryColor;
    document.documentElement.style.setProperty("--primary", primaryColorHsl);

    // Apply dark/light mode
    if (theme.mode === "dark" || (theme.mode === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Listen for system preference changes if in auto mode
  useEffect(() => {
    if (theme.mode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      };
      
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme.mode]);

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
