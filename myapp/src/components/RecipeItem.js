import React from "react";

const RecipeItem = ({ recipe, onToggleFavorite }) => {
  return (
    <div className="recipe-item">
      <img src={recipe.image} alt={recipe.title} />
      <h3>{recipe.title}</h3>
      <button onClick={() => onToggleFavorite(recipe)}>
        {recipe.isFavorite ? "Remove from Favorites" : "Add to Favorite"}
      </button>
    </div>
  );
};

export default RecipeItem;