import React from "react";
import RecipeItem from "./RecipeItem";

const RecipeList = ({ recipes, onToggleFavorite }) => {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeItem
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default RecipeList;