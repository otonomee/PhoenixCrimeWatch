// // TotalCrimes.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const TotalCrimes = () => {
//   const [yearlyCounts, setYearlyCounts] = useState({});

//   useEffect(() => {
//     axios.get("http://localhost:3000/crimes").then((response) => {
//       const countsByYear = response.data.reduce((acc, curr) => {
//         const year = new Date(curr.occurred_on).getFullYear();
//         if (!isNaN(year)) {
//           acc[year] = (acc[year] || 0) + 1;
//         }
//         return acc;
//       }, {});

//       setYearlyCounts(countsByYear);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Total Crimes by Year</h2>
//       {Object.entries(yearlyCounts).map(([year, count]) => (
//         <p key={year}>
//           {year}: {count}
//         </p>
//       ))}
//     </div>
//   );
// };

// export default TotalCrimes;

// components/TotalCrimes.js
// components/TotalCrimes.js
import React, { useState, useEffect } from "react";
import { useYear } from "../../contexts/YearContext.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const TotalCrimes = () => {
  const [total, setTotal] = useState(0);
  const { year } = useYear();
  const { crimeData } = useCrimeData();

  useEffect(() => {
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });
    setTotal(filteredData.length);
  }, [crimeData, year]);

  return (
    <div>
      <h3 className="metric-header">Total Crimes in {year}</h3>
      <p style={{ fontSize: "48px" }}>{total}</p>
    </div>
  );
};

export default TotalCrimes;
