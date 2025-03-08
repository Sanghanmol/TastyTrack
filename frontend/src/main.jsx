import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RecipeForm from "./components/RecipeForm";
import RecipePage from "./pages/RecipePage";
import Navbar from "./components/Navbar";

ReactDOM.createRoot(document.getElementById("app")).render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
