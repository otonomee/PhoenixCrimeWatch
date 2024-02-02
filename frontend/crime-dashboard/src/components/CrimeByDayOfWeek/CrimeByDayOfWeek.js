import React, { useState, useEffect } from "react";
import BarChart from "../BarChart/BarChart.js"; // Create a BarChart component for displaying the breakdown
import DayOfWeekLineChart from "../DayOfWeekLineChart/DayOfWeekLineChart.js"; // Create a BarChart component for displaying the breakdown
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

    // Group data by day of the week and count crimes
    const dayCounts = filteredData.reduce((acc, crime) => {
      const crimeDate = new Date(crime.occurred_on);
      const crimeDayOfWeek = crimeDate.getDay(); // 0 (Sunday) to 6 (Saturday)
      if (!acc[crimeDayOfWeek]) {
        acc[crimeDayOfWeek] = 0;
      }
      acc[crimeDayOfWeek]++;
      return acc;
    }, {});

    // Calculate the average number of crimes per day of the week
    const weeksInYear = year % 4 === 0 ? 53 : 52; // Account for leap years
    const averageDayCounts = Array.from({ length: 7 }, (_, day) => {
      const total = dayCounts[day] || 0;
      const average = total / weeksInYear;
      return { day: day, count: Number(average.toFixed(1)) }; // Round to 1 decimal place
    });

    setDayOrTimeData(averageDayCounts);
  }, [crimeData, year]);

  // ...

  return (
    <div className="metric-container">
      <h3 className="metric-header">Crime Average Count by Day of Week</h3>
      <DayOfWeekLineChart data={dayOrTimeData} xField="day" yField="count" />
    </div>
  );
};

export default CrimeByDayOrTime;
