import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const LineChart = ({ data, xField, yField }) => {
  const ref = useRef();

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

    const xScale = d3
      .scaleTime()
      .domain([new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 0, 0)])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d[yField])])
      .range([height, 0]);

    const line = d3
      .line()
      .x((d) => xScale(new Date(0, 0, 0, d[xField], 0, 0)))
      .y((d) => yScale(d[yField]));

    g.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 8).attr("d", line);

    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .ticks(d3.timeHour.every(3))
          .tickFormat((d) => {
            // Get the hour (in 24-hour format) and the AM/PM part
            const hour = d.getHours();
            const ampm = hour < 12 ? "AM" : "PM";

            // Convert the hour to 12-hour format and remove leading zeros
            const hour12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;

            // Return the formatted time
            return `${hour12}${ampm}`;
          })
      )
      .selectAll("text")
      .style("font-size", "20px");

    g.append("g").call(d3.axisLeft(yScale).ticks(5)).selectAll("text").style("font-size", "20px");
  }, [data, xField, yField]);

  return <svg ref={ref}></svg>;
};

export default LineChart;
