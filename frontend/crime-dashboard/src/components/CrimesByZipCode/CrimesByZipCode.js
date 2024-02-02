// CrimesByZipCode.js
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const CrimesByZipCode = () => {
  const [data, setData] = useState([]);
  const ref = useRef();

  useEffect(() => {
    axios.get("http://localhost:3000/crimes").then((response) => {
      const zipCounts = response.data.reduce((acc, curr) => {
        acc[curr.zip] = (acc[curr.zip] || 0) + 1;
        return acc;
      }, {});

      const transformedData = Object.entries(zipCounts).map(([zip, count]) => ({
        zip,
        count,
      }));

      setData(transformedData);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const width = 450;
    const height = 450;
    const margin = 40;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3
      .select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.zip))
      .range(d3.schemeSet3);

    const pie = d3.pie().value((d) => d.count);
    const data_ready = pie(data);

    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    svg
      .selectAll("pieces")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (d) => color(d.data.zip));
  }, [data]);

  return (
    <div>
      <h2>Crimes by Zip Code</h2>
      <svg ref={ref}></svg>
    </div>
  );
};

export default CrimesByZipCode;
