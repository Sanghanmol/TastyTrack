const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

router.get('/', async (req, res) => {
    const recipes = await Recipe.find().populate('category');
    res.json(recipes);
});

router.post('/', async (req, res) => {
    try {
        const { name, ingredients, instructions, category } = req.body;
        const newRecipe = new Recipe({ name, ingredients, instructions, category });
        await newRecipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;