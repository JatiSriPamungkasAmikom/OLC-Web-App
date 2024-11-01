import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ThemeContext } from "./themeContext";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import "./App.css";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const searchRecipes = async (query) => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.id === recipe.id);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  useEffect(() => {
    // Mengubah warna background body berdasarkan tema
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
    document.body.style.color = theme === 'light' ? '#000000' : '#ffffff';

    // Mengembalikan warna asli ketika komponen tidak lagi digunakan
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [theme]);

  const buttonStyle = {
    backgroundColor: theme === 'light' ? '#333333' : '#f4d35e', // Berlawanan dengan backgroundColor
    color: theme === 'light' ? '#ffffff' : '#000000',           // Berlawanan dengan color
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px'
  };

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme} style={buttonStyle}>Change Theme</button>
      
      <SearchBar onSearch={searchRecipes} />
      
      <RecipeList recipes={favorites} onToggleFavorite={toggleFavorite} />
      <h1>Favorites</h1>
      <RecipeList recipes={recipes} onToggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;