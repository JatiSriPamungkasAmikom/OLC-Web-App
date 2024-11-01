import React from "react";
import "../App.css";
import "./RecipeItem.css";

const RecipeItem = ({ recipe, isFavorite, onToggleFavorite }) => {
  return (
    <div className="recipe-item">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <button onClick={() => onToggleFavorite(recipe)} className="btnStyle">
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default RecipeItem;