import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const DayOfWeekLineChart = ({ data, xField, yField }) => {
  const ref = useRef();
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.html("");
    svg.selectAll("*").remove(); // This line removes all child elements of the SVG

    if (data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 960 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(daysOfWeek).range([0, width]).padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d[yField])) // Set the domain to the min and max of the data
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(daysOfWeek[d[xField]]))
      .y((d) => yScale(d[yField]));

    g.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 8).attr("d", line);

    g.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(xScale)).selectAll("text").style("font-size", "20px");

    g.append("g").call(d3.axisLeft(yScale).ticks(5)).selectAll("text").style("font-size", "20px");
  }, [data, xField, yField]);

  return <svg ref={ref}></svg>;
};

export default DayOfWeekLineChart;
