import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import BarChart from "./components/BarChart/BarChart";
import PieChart from "./components/PieChart/PieChart";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://127.0.0.1:3000/crimes");
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">{data && <BarChart data={data} />}</header>
    </div>
  );
}

export default App;
