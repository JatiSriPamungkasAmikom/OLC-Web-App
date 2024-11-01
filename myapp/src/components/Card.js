// Card.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Card = ({ recipeId, onClose }) => {
  const [recipeDetail, setRecipeDetail] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`
        );
        setRecipeDetail(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    if (recipeId) {
      fetchRecipeDetail();
    }
  }, [recipeId]);

  if (!recipeDetail) return null;

  return (
    <div className="card">
      <button onClick={onClose}>Close</button>
      <img src={recipeDetail.image} alt={recipeDetail.title} />
      <h2>{recipeDetail.title}</h2>
      <p>{recipeDetail.summary.replace(/<\/?[^>]+(>|$)/g, "")}</p>
      <ul>
        {recipeDetail.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>
    </div>
  );
};

export default Card;
