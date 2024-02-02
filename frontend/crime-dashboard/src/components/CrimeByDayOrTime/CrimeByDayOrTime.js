import React, { useState, useEffect } from "react";
import BarChart from "../BarChart/BarChart.js"; // Create a BarChart component for displaying the breakdown
import { useYear } from "../../contexts/YearContext";
import { useCrimeData } from "../../contexts/CrimeDataContext";

const CrimeByDayOrTime = () => {
  const [dayOrTimeData, setDayOrTimeData] = useState([]);
  const { year } = useYear();
  const { crimeData } = useCrimeData();

  // ...

  useEffect(() => {
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
      return { hour, count: average };
    });

    setDayOrTimeData(averageHourCounts);
  }, [crimeData, year]);

  // ...

  return (
    <div className="metric-container">
      <h3>Crime by Day of the Week or Time of Day</h3>
      <BarChart data={dayOrTimeData} xField="hour" yField="count" />
    </div>
  );
};

export default CrimeByDayOrTime;
