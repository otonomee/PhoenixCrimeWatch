// MostCommonCrime.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const MostCommonCrime = () => {
  const [mostCommonPerYear, setMostCommonPerYear] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/crimes").then((response) => {
      const groupedByYear = response.data.reduce((acc, curr) => {
        const year = new Date(curr.occurred_on).getFullYear();
        if (!isNaN(year)) {
          if (!acc[year]) acc[year] = {};
          const category = curr.ucr_crime_category;
          acc[year][category] = (acc[year][category] || 0) + 1;
        }
        return acc;
      }, {});

      const mostCommonByYear = Object.entries(groupedByYear).reduce((acc, [year, categories]) => {
        const mostCommon = Object.entries(categories).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0]);
        acc[year] = mostCommon[0];
        return acc;
      }, {});

      setMostCommonPerYear(mostCommonByYear);
    });
  }, []);

  return (
    <div>
      <h2>Most Common Crime by Year</h2>
      {Object.entries(mostCommonPerYear).map(([year, crime]) => (
        <p key={year}>
          {year}: {crime}
        </p>
      ))}
    </div>
  );
};

export default MostCommonCrime;
