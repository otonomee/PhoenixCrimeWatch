// TotalCrimes.js
import React, { useState, useEffect } from "react";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const TotalCrimes = () => {
  const [total, setTotal] = useState(0);
  const year = "2023"; // Set year to 2023
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });
    setTotal(filteredData.length);
  }, [crimeData]);

  return (
    <div>
      <h3 className="metric-header">Total Crimes in {year}</h3>
      <p style={{ fontSize: "48px" }}>{total}</p>
    </div>
  );
};

export default TotalCrimes;
