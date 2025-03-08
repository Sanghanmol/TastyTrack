import axios from "axios";

const PIXABAY_API_KEY = "49234130-22a45b56c47ba3b91679fe4c9";
const API_URL = "http://localhost:5000/api";

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}/recipes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
};

export const getRecipeById = async (id) => { 
  try {
    const response = await axios.get(`${API_URL}/recipes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching recipe with ID ${id}:`, error);
    return null;
  }
};

export const addRecipe = async (recipe) => {
  try {
    const response = await axios.post(`${API_URL}/recipes`, recipe, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    return null;
  }
};

export const getRecipeImage = async (title) => {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${title}&image_type=photo`
    );
    return response.data.hits[0]?.largeImageURL || "https://via.placeholder.com/400x300?text=No+Image";
  } catch (error) {
    console.error("Error fetching image:", error);
    return "https://via.placeholder.com/400x300?text=No+Image";
  }
};
