// YearSelector.js
import React from "react";
import { useYear } from "../../contexts/YearContext.js"; // Adjust the import path based on your structure
import "./YearSelector.css"; // Import the CSS file

const YearSelector = () => {
  const { year, setYear } = useYear();
  const currentYear = new Date().getFullYear();
  const years = Array.from(new Array(20), (val, index) => currentYear - index).map(String); // Convert years to string

  return (
    <select className="year-selector" value={year} onChange={(e) => setYear(e.target.value)}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default YearSelector;
