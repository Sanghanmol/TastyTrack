import React, { useEffect, useState } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { getRecipeById, getRecipeImage } from "../api/api";
import "../styles/RecipeDetails.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const data = await getRecipeById(id);
        if (!data) throw new Error("Recipe not found");
        setRecipe(data);

        const imageUrl = await getRecipeImage(data.name);
        setImage(imageUrl);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (!recipe)
    return <p className="loading-text">⏳ Loading recipe details...</p>;

  return (
    <div className="recipe-details-container">
      <div className="recipe-card">
        <img src={image} alt={recipe.name} className="recipe-image" />
        <div className="recipe-content">
          <h2 className="recipe-title">{recipe.name}</h2>
          <p className="recipe-category">📂 Category: {recipe.category || "Not specified"}</p>

          <h3 className="ingredients-title">🛒 Ingredients:</h3>
          <ul className="ingredient-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient}
              </li>
            ))}
          </ul>

          <h3 className="instructions-title">📌 Instructions:</h3>
          <ol className="instruction-list">
            {recipe.instructions.split(". ").map((step, index) => (
              <li key={index} className="instruction-item">
                {step}
              </li>
            ))}
          </ol>
        </div>
        <button className="back-button" onClick={handleGoBack}>🔙 Back to Home</button>
      </div>
    </div>
  );
};

export default RecipeDetails;
