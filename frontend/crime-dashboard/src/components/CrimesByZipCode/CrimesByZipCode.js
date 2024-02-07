import React, { useState, useEffect } from "react";
import HBarChart from "../HBarChart/HBarChart.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const CrimesByZipCode = () => {
  const [zipData, setZipData] = useState([]);
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const year = "2023"; // Set year to 2023
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });

    const zipCounts = filteredData.reduce((acc, crime) => {
      acc[crime.zip] = acc[crime.zip] || 0;
      acc[crime.zip]++;
      return acc;
    }, {});

    const sortedZipCounts = Object.entries(zipCounts)
      .map(([zip, count]) => ({ zip, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setZipData(sortedZipCounts);
  }, [crimeData]);

  return (
    <div className="metric-container">
      <h3 className="metric-header">Top 10 Zip Codes By Crime Count</h3>
      <HBarChart data={zipData} xField="count" yField="zip" height={600} />
    </div>
  );
};

export default CrimesByZipCode;
