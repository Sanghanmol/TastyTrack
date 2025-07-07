import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>🍴 Tasty Track &copy; {new Date().getFullYear()} — Made with ❤️ for food lovers</p>
    </footer>
  );
};

export default Footer;
