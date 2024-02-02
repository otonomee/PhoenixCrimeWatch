// TotalCrimes.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const TotalCrimes = () => {
  const [yearlyCounts, setYearlyCounts] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/crimes").then((response) => {
      const countsByYear = response.data.reduce((acc, curr) => {
        const year = new Date(curr.occurred_on).getFullYear();
        if (!isNaN(year)) {
          acc[year] = (acc[year] || 0) + 1;
        }
        return acc;
      }, {});

      setYearlyCounts(countsByYear);
    });
  }, []);

  return (
    <div>
      <h2>Total Crimes by Year</h2>
      {Object.entries(yearlyCounts).map(([year, count]) => (
        <p key={year}>
          {year}: {count}
        </p>
      ))}
    </div>
  );
};

export default TotalCrimes;
