import React, { useEffect, useState } from "react";
import { getRecipes } from "../api/api"; 
import { getRecipeImage } from "../api/api";
import { Link } from "react-router-dom";
import "../styles/RecipeList.css";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      const fetchedRecipes = await getRecipes();
      const recipesWithImages = await Promise.all(
        fetchedRecipes.map(async (recipe) => {
          const imageUrl = await getRecipeImage(recipe.name);
          return { ...recipe, imageUrl };
        })
      );

      setRecipes(recipesWithImages);
    }

    fetchRecipes();
  }, []);

  return (
    <div className="recipe-container">
      <h2 className="recipe-title">🍽️ Delicious Recipes</h2>
      {recipes.length === 0 ? (
        <p className="loading-text">Loading recipes...</p>
      ) : (
        <div className="recipe-list">
          {recipes.map((recipe) => (
            <Link to={`/recipe/${recipe._id}`} key={recipe._id} className="recipe-card">
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="recipe-img"
              />
              <div className="recipe-info">
                <h3>{recipe.name}</h3>
                <p>{recipe.description || "A tasty homemade recipe!"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecipeList;
