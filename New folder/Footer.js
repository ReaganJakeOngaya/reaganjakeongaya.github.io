import React from "react";

const Footer = ({ id }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[30px] bg-blue-700 flex items-center justify-between px-4 text-white text-sm">
      {/* Social Media Icons */}
      <div className="flex space-x-3">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/facebook--v1.png"
            alt="Facebook"
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/twitter.png"
            alt="Twitter"
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/instagram-new.png"
            alt="Instagram"
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img
            src="https://img.icons8.com/ios-filled/20/ffffff/linkedin.png"
            alt="LinkedIn"
            className="hover:opacity-80 transition-opacity duration-300"
          />
        </a>
      </div>

      {/* Copyright Text */}
      <div className="text-xs">
        &copy; {new Date().getFullYear()} reaganjake. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
