import React, { useState, useEffect } from "react";
import HBarChart from "../HBarChart/HBarChart.js";
import { useYear } from "../../contexts/YearContext.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";
import moment from "moment";
import * as d3 from "d3"; // Import d3 library

const CrimeByLocationType = () => {
  const [locationTypeData, setLocationTypeData] = useState([]);
  const { year } = useYear();
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const filteredData = crimeData.filter((crime) => {
      const crimeDate = moment(crime.occurred_on, "MM/DD/YYYY HH:mm");
      const crimeYear = crimeDate.year().toString();
      return crimeYear === year;
    });

    // Group data by location type and count crimes
    const locationTypeCounts = filteredData.reduce((acc, crime) => {
      const locationType = crime.premise_type;
      if (!acc[locationType]) {
        acc[locationType] = 0;
      }
      acc[locationType]++;
      return acc;
    }, {});

    // Transform the counts into an array of objects, sort by count in descending order, and take the first 10 items
    const sortedLocationTypeData = Object.entries(locationTypeCounts)
      .map(([premise_type, count]) => ({ premise_type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    setLocationTypeData(sortedLocationTypeData);
  }, [crimeData, year]);

  return (
    <div className="metric-container">
      <h3>Top 10 Crime Locations By Count</h3>
      <HBarChart data={locationTypeData} xField="count" yField="premise_type" height={600} />
    </div>
  );
};

export default CrimeByLocationType;
