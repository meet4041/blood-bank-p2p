import React from "react";

const Footer = () => {
  return (
    <footer className="w-full text-center p-6 bg-gray-100 mt-8">
      <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Blood Bank P2P</p>
    </footer>
  );
};

export default Footer;
