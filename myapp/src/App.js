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
  const [filteredFavorites, setFilteredFavorites] = useState([]);

  const searchRecipes = async (query) => {
    if (!query) return;

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=364850e51f3244b9854207a6b6d4744f`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const searchFavorites = (query) => {
    if (!query) {
      setFilteredFavorites(favorites);
      return;
    }
    const results = favorites.filter((fav) =>
      fav.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredFavorites(results);
  };

  const getListRecipes = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?&apiKey=364850e51f3244b9854207a6b6d4744f`
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.id === recipe.id);
    const updatedFavorites = isFavorite
      ? favorites.filter((fav) => fav.id !== recipe.id)
      : [...favorites, recipe];

    setFavorites(updatedFavorites);
    setFilteredFavorites(updatedFavorites);

    // Filter out the favorite recipes from the main recipes list
    const updatedRecipes = recipes.filter((rec) => rec.id !== recipe.id);
    setRecipes(isFavorite ? [...updatedRecipes, recipe] : updatedRecipes);
  };

  useEffect(() => {
    getListRecipes();
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = theme === 'light' ? '#ffffff' : '#333333';
    document.body.style.color = theme === 'light' ? '#000000' : '#ffffff';

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [theme]);

  const buttonStyle = {
    backgroundColor: theme === 'light' ? '#333333' : '#f4d35e',
    color: theme === 'light' ? '#ffffff' : '#000000',
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
      
      <h1>Favorites</h1>
      <SearchBar onSearch={searchFavorites} />
      <RecipeList recipes={filteredFavorites} favorites={favorites} onToggleFavorite={toggleFavorite} />

      <h1>All Recipes</h1>
      <SearchBar onSearch={searchRecipes} />
      <RecipeList recipes={recipes} favorites={favorites} onToggleFavorite={toggleFavorite} />
    </div>
  );
};

export default App;