// MostCommonCrime.js
import React, { useState, useEffect } from "react";
import { useYear } from "../../contexts/YearContext.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const MostCommonCrime = () => {
  const [mostCommon, setMostCommon] = useState("");
  const { year } = useYear();
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });

    const crimeCounts = filteredData.reduce((acc, { ucr_crime_category }) => {
      acc[ucr_crime_category] = (acc[ucr_crime_category] || 0) + 1;
      return acc;
    }, {});

    const mostCommonCrime = Object.entries(crimeCounts).reduce((a, b) => (a[1] > b[1] ? a : b), ["", 0])[0];
    setMostCommon(mostCommonCrime);
  }, [crimeData, year]);

  return (
    <div>
      <h3>Most Common Crime in {year}</h3>
      <p>{mostCommon || "No data available"}</p>
    </div>
  );
};

export default MostCommonCrime;
