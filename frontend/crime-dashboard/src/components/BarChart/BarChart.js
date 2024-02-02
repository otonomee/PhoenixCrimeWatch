import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, xField, yField }) => {
  const ref = useRef();

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
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

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => new Date(0, 0, 0, d[xField], 0, 0)))
      .range([0, width])
      .padding(0.1);

    const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%I %p"));

    const yScale = d3.scaleLinear().range([height, 0]);

    xScale.domain(data.map((d) => new Date(0, 0, 0, d[xField], 0, 0)));
    yScale.domain([0, d3.max(data, (d) => d[yField])]);

    svg.append("g").attr("transform", `translate(0, ${height})`).call(xAxis).selectAll("text").style("font-size", "20px"); // Increase the font size

    svg.append("g").call(d3.axisLeft(yScale).tickFormat(d3.format("~s")));

    const bars = svg.selectAll(".bar").data(data).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(new Date(0, 0, 0, d[xField], 0, 0)))
      .attr("width", width / 24)
      .attr("y", (d) => yScale(d[yField]))
      .attr("height", (d) => height - yScale(d[yField]))
      .attr("fill", "#69b3a2");

    bars
      .append("text")
      .attr("x", (d) => xScale(new Date(0, 0, 0, d[xField], 0, 0)) + width / 48)
      .attr("y", (d) => yScale(d[yField]) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d[yField]);

    bars.append("title").text((d) => `${xField}: ${d[xField]}\n${yField}: ${d[yField]}`);
  }, [data, xField, yField]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
