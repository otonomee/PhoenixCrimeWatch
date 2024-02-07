import React from "react";
import BarChart from "../BarChart/BarChart.js";
import TotalCrimes from "../TotalCrime/TotalCrime.js";
import MostCommonCrime from "../MostCommonCrime/MostCommonCrime.js";
import CrimesByZipCode from "../CrimesByZipCode/CrimesByZipCode.js";
import CrimeTrendsOverTime from "../CrimeTrendsOverTime/CrimeTrendsOverTime.js";
import CrimeByLocationType from "../CrimeByLocationType/CrimeByLocationType.js";
import CrimeByDayOrTime from "../CrimeByDayOrTime/CrimeByDayOrTime.js";
import CrimeByDayOfWeek from "../CrimeByDayOfWeek/CrimeByDayOfWeek.js";

import YearSelector from "../YearSelector/YearSelector.js";

import "./DashboardPage.css"; // Import your CSS file for styling

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Phoenix Crime Dashboard - 2023</h1>
      {/* <YearSelector /> */}
      <div className="dashboard-grid">
        <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "25px", height: "675px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", flex: ".35" }}>
            <div className="metric-tile" style={{ height: "50%", display: "flex", alignItems: "center", fontSize: "28px", width: "auto" }}>
              <TotalCrimes />
            </div>
            <div className="metric-tile" style={{ height: "50%", display: "flex", alignItems: "center", fontSize: "28px", width: "auto" }}>
              <MostCommonCrime />
            </div>
          </div>
          <div className="metric-tile zip-code-chart">
            <CrimesByZipCode />
          </div>
          <div className="metric-tile location-type-chart">
            <CrimeByLocationType />
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "row", width: "100%", gap: "25px" }}>
          <div className="metric-tile">
            <CrimeByDayOrTime />
          </div>
          <div className="metric-tile">
            <CrimeByDayOfWeek />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
