import React, { useState, useEffect } from "react";
import BarChart from "../BarChart/BarChart.js";
import LineChart from "../LineChart/LineChart.js";
import { useCrimeData } from "../../contexts/CrimeDataContext";

const CrimeByDayOrTime = () => {
  const [dayOrTimeData, setDayOrTimeData] = useState([]);
  const { crimeData } = useCrimeData();

  // ...

  useEffect(() => {
    const year = "2023"; // Set year to 2023

    // Filter and aggregate data based on your requirements
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });

    // Group data by day and hour and count crimes
    const dayHourCounts = filteredData.reduce((acc, crime) => {
      const crimeDate = new Date(crime.occurred_on);
      const crimeDay = `${crimeDate.getFullYear()}-${crimeDate.getMonth()}-${crimeDate.getDate()}`;
      const crimeHour = crimeDate.getHours();
      if (!acc[crimeDay]) {
        acc[crimeDay] = {};
      }
      if (!acc[crimeDay][crimeHour]) {
        acc[crimeDay][crimeHour] = 0;
      }
      acc[crimeDay][crimeHour]++;
      return acc;
    }, {});

    // Calculate the average number of crimes per hour
    const averageHourCounts = Array.from({ length: 24 }, (_, hour) => {
      const counts = Object.values(dayHourCounts).map((day) => day[hour] || 0);
      const total = counts.reduce((a, b) => a + b, 0);
      const average = total / counts.length;
      return { hour: hour, count: Number(average.toFixed(1)) }; // Round to 1 decimal place
    });

    setDayOrTimeData(averageHourCounts);
  }, [crimeData]);

  // ...

  return (
    <div className="metric-container">
      <h3 className="metric-header">Crime Average Count by Time of Day</h3>
      <LineChart data={dayOrTimeData} xField="hour" yField="count" />
    </div>
  );
};

export default CrimeByDayOrTime;
