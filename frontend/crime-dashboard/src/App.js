// App.js
import React from "react";
import DashboardPage from "./components/DashboardPage/DashboardPage.js";
import { YearProvider } from "./contexts/YearContext";
import { CrimeDataProvider } from "./contexts/CrimeDataContext";

// import App.css
import "./App.css";

function App() {
  return (
    <YearProvider>
      <CrimeDataProvider>
        <DashboardPage />
        {/* other components */}
      </CrimeDataProvider>
    </YearProvider>
  );
}

export default App;
