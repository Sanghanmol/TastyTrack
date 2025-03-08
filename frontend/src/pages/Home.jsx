import React from "react";
import RecipeList from "../components/RecipeList";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <p className="quote">
        <span className="quote-text">
          "Great recipes aren’t just about ingredients; they tell stories, create
          memories, and bring people together."
        </span>
      </p>
      <div className="content-wrapper">
        <RecipeList />
      </div>
    </div>
  );
};

export default Home;