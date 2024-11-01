import React, { useContext } from "react";
import { ThemeContext } from "../themeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-toggle">
      Change Theme to {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;