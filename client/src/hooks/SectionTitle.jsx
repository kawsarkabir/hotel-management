import React, { useEffect, useState } from "react";

const SectionTitle = ({ heading, description }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  // Watch for theme changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(localStorage.getItem("theme") || "light");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <section className="meals-by-category py-8 mt-16">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2
          className={`text-4xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {heading}
        </h2>

        {/* Description */}
        <p
          className={`mt-4 max-w-lg mx-auto ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
};

export default SectionTitle;
