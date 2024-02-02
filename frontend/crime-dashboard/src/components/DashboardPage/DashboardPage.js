// DashboardPage.js
import React from "react";
import BarChart from "../BarChart/BarChart.js";
import TotalCrimes from "../TotalCrime/TotalCrime.js";
import MostCommonCrime from "../MostCommonCrime/MostCommonCrime.js";
import CrimesByZipCode from "../CrimesByZipCode/CrimesByZipCode.js";

// rest of your code...

const DashboardPage = () => {
  return (
    <div>
      <h1>Crime Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
        <TotalCrimes />
        <MostCommonCrime />
        <CrimesByZipCode />
        <BarChart />
      </div>
    </div>
  );
};

export default DashboardPage;
