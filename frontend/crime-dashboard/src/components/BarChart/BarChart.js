import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const BarChart = ({ data, xField, yField }) => {
  const ref = useRef();

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

    xScale.domain(data.map((d) => d[xField]));
    yScale.domain([0, d3.max(data, (d) => d[yField])]);

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
      .attr("x", (d) => xScale(d[xField]))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d[yField]))
      .attr("height", (d) => height - yScale(d[yField]))
      .attr("fill", "#69b3a2");

    bars
      .append("text")
      .attr("x", (d) => xScale(d[xField]) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d[yField]) - 5)
      .attr("text-anchor", "middle")
      .text((d) => d[yField]);

    bars.append("title").text((d) => `${xField}: ${d[xField]}\n${yField}: ${d[yField]}`);
  }, [data, xField, yField]);

  return <svg ref={ref}></svg>;
};

export default BarChart;
