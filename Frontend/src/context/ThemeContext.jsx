import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "forest"; // default theme
  });

useEffect(() => {
  // Apply theme to the document root element
  document.documentElement.setAttribute("data-theme", theme);
}, [theme]);


  const changeTheme = (selectedTheme) => {
    localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;
