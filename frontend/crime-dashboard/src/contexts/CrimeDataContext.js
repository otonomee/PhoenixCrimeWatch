import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CrimeDataContext = createContext();
//add
export const useCrimeData = () => useContext(CrimeDataContext);

export const CrimeDataProvider = ({ children }) => {
  const [crimeData, setCrimeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      // const cachedData = localStorage.getItem("crimeData");

      // if (cachedData) {
      //   setCrimeData(JSON.parse(cachedData));
      //   setIsLoading(false);
      // } else {
      try {
        const response = await axios.get("https://crime-dashboard-api-5fc16ed78a07.herokuapp.com/crimes");
        console.log("API response:", response.data); // Add this line
        // localStorage.setItem("crimeData", JSON.stringify(response.data));
        setCrimeData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch crime data:", error);
        setError(error);
        setIsLoading(false);
      }
      // }
    };

    loadData();
  }, []); // Empty dependency array ensures this runs once on mount

  return <CrimeDataContext.Provider value={{ crimeData, isLoading, error }}>{children}</CrimeDataContext.Provider>;
};
