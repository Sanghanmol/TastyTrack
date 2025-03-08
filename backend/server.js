const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const recipeRoutes = require("./routes/recipes");

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));