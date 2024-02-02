import React from "react";
import BarChart from "../BarChart/BarChart.js";
import TotalCrimes from "../TotalCrime/TotalCrime.js";
import MostCommonCrime from "../MostCommonCrime/MostCommonCrime.js";
import CrimesByZipCode from "../CrimesByZipCode/CrimesByZipCode.js";
import CrimeTrendsOverTime from "../CrimeTrendsOverTime/CrimeTrendsOverTime.js";
import CrimeByLocationType from "../CrimeByLocationType/CrimeByLocationType.js";
import CrimeByDayOrTime from "../CrimeByDayOrTime/CrimeByDayOrTime.js";
import YearSelector from "../YearSelector/YearSelector.js";

import "./DashboardPage.css"; // Import your CSS file for styling

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Crime Dashboard</h1>
      <YearSelector />
      <div className="dashboard-grid">
        <div className="metric-tile">
          <TotalCrimes />
        </div>
        <div className="metric-tile">
          <MostCommonCrime />
        </div>

        <div className="metric-tile zip-code-chart">
          <CrimesByZipCode />
        </div>
        <div className="metric-tile location-type-chart">
          <CrimeByLocationType />
        </div>

        <div className="metric-tile full-width">
          <CrimeTrendsOverTime />
        </div>
        <div className="metric-tile">
          <CrimeByDayOrTime />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
