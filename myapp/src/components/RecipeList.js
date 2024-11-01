import React from "react";
import RecipeItem from "./RecipeItem";
import "../App.css";

const RecipeList = ({ recipes, favorites, onToggleFavorite }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found</p>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          isFavorite={favorites.some((fav) => fav.id === recipe.id)} // Cek apakah item adalah favorit
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;