import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addRecipe } from "../api/api";
import "../styles/RecipeForm.css";

const RecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: "",
    instructions: "",
    category: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formattedRecipe = {
      ...recipe,
      ingredients: recipe.ingredients.split(",").map((i) => i.trim()),
      instructions: recipe.instructions.trim(),
    };

    try {
      await addRecipe(formattedRecipe);
      setSuccess("✅ Recipe added successfully!");
      setRecipe({ name: "", description: "", ingredients: "", instructions: "", category: "" });

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setError("❌ Failed to add recipe. Please try again.");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">📝 Add a New Recipe</h2>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">{success}</p>}

      <form className="recipe-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={recipe.description}
          onChange={handleChange}
          required
          className="form-textarea"
        />
        <input
          type="text"
          name="ingredients"
          placeholder="Ingredients (comma-separated)"
          value={recipe.ingredients}
          onChange={handleChange}
          required
          className="form-input"
        />
        <textarea
          name="instructions"
          placeholder="Instructions (dot-separated)"
          value={recipe.instructions}
          onChange={handleChange}
          required
          className="form-textarea"
        />
        <select 
          name="category" 
          value={recipe.category} 
          onChange={handleChange} 
          required
          className="form-select"
        >
          <option value="" disabled>Select Category</option>
          <option value="Breakfast">🍳 Breakfast</option>
          <option value="Lunch">🥗 Lunch</option>
          <option value="Dinner">🍽️ Dinner</option>
          <option value="Dessert">🍰 Dessert</option>
          <option value="Snack">🍿 Snack</option>
        </select>

        <button type="submit" className="submit-btn">➕ Add Recipe</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/")}>🔙 Back to Home</button>
    </div>
  );
};

export default RecipeForm;
