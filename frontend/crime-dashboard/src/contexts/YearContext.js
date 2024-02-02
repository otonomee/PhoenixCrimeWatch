// contexts/YearContext.js
import React, { createContext, useContext, useState } from "react";

const YearContext = createContext();

export const useYear = () => useContext(YearContext);

export const YearProvider = ({ children }) => {
  const [year, setYear] = useState(new Date().getFullYear().toString()); // Year as string for dropdown compatibility

  return <YearContext.Provider value={{ year, setYear }}>{children}</YearContext.Provider>;
};
