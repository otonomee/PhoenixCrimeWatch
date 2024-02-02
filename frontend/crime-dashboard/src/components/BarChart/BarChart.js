import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const BarChart = () => {
  const [data, setData] = useState([]);
  const ref = useRef();

  useEffect(() => {
    axios.get("http://localhost:3000/crimes").then((response) => {
      const crimeCounts = response.data.reduce((acc, curr) => {
        acc[curr.crime_category] = (acc[curr.crime_category] || 0) + 1;
        return acc;
      }, {});

      const transformedData = Object.entries(crimeCounts).map(([crime_category, count]) => ({
        crime_category,
        count,
      }));

      setData(transformedData);
    });
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(data.map((d) => d.crime_category));
    yScale.domain([0, d3.max(data, (d) => d.count)]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    svg.append("g").call(d3.axisLeft(yScale).tickFormat(d3.format("~s")));

    const bars = svg.selectAll(".bar").data(data).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.crime_category))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d.count))
      .attr("height", (d) => height - yScale(d.count))
      .attr("fill", "#69b3a2");

    bars
      .append("text")
      .attr("x", (d) => xScale(d.crime_category) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d.count) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d.count);

    bars.append("title").text((d) => `Crime Category: ${d.crime_category}\nCount: ${d.count}`);
  }, [data]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
