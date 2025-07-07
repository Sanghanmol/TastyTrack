const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const logger = require('./middleware/logger');
const recipeRoutes = require("./routes/recipes");
const path = require('path');

require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.use("/api/recipes", recipeRoutes);

app.use(express.static(path.join(__dirname, 'client')));

app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));