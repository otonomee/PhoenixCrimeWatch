import React, { useState, useEffect } from "react";
import LineChart from "../LineChart/LineChart.js"; // Create a LineChart component for displaying the trend
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const CrimeTrendsOverTime = () => {
  const [trendsOverTimeData, setTrendsOverTimeData] = useState([]);
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const year = "2023"; // Set year to 2023
    // Filter and aggregate data based on your requirements
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });

    // Group data by month and count crimes
    const monthlyData = filteredData.reduce((acc, crime) => {
      const crimeMonth = new Date(crime.occurred_on).getMonth();
      if (!acc[crimeMonth]) {
        acc[crimeMonth] = 0;
      }
      acc[crimeMonth]++;
      return acc;
    }, {});

    setTrendsOverTimeData(Object.entries(monthlyData).map(([month, count]) => ({ month, count })));
  }, [crimeData]);

  return (
    <div className="metric-container">
      <h3>Crime Trends Over Time</h3>
      <LineChart data={trendsOverTimeData} />
    </div>
  );
};

export default CrimeTrendsOverTime;
