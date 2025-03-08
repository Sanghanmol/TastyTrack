const express = require("express");
const Recipe = require("../models/Recipe");
const router = express.Router();

router.get("/", async (req, res) => {
  const recipes = await Recipe.find();
  res.json(recipes);
});

router.post("/", async (req, res) => {
  try {
    const { name, description, ingredients, instructions, category } = req.body;

    if (!name || !description || !ingredients || !instructions) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newRecipe = new Recipe({
      name,
      description,
      ingredients,
      instructions,
      category,
    });

    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Error saving recipe." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.json(recipe);
  } catch (error) {
    console.error("Error fetching recipe:", error);
    res.status(500).json({ error: "Error fetching recipe." });
  }
});

module.exports = router;
