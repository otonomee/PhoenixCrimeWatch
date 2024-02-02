import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const HBarChart = ({ data, xField, yField, height = 800 }) => {
  const ref = useRef();

  useEffect(() => {
    const svgOld = d3.select(ref.current);
    svgOld.selectAll("*").remove();
    if (data.length === 0) return;

    const margin = { top: 20, right: 20, bottom: 30, left: 250 };
    const width = 1000 - margin.left - margin.right;

    const svg = d3
      .select(ref.current)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left + 150},${margin.top})`);

    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleBand().range([0, height]).padding(0.05);

    xScale.domain([0, d3.max(data, (d) => d[xField])]);
    yScale.domain(data.map((d) => d[yField]));

    svg.append("g").call(d3.axisLeft(yScale)).selectAll("text").style("font-size", "20px");
    svg
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.format("~s")));

    const bars = svg.selectAll(".bar").data(data).enter().append("g");

    bars
      .append("rect")
      .attr("class", "bar")
      .attr("y", (d) => yScale(d[yField]))
      .attr("height", yScale.bandwidth())
      .attr("x", 0)
      .attr("width", (d) => xScale(d[xField]))
      .attr("fill", "#69b3a2");

    bars
      .append("text")
      .attr("y", (d) => yScale(d[yField]) + yScale.bandwidth() / 2)
      .attr("x", (d) => xScale(d[xField]) + 5)
      .attr("dy", ".35em")
      .text((d) => d[xField]);

    bars.append("title").text((d) => `${yField}: ${d[yField]}\n${xField}: ${d[xField]}`);
  }, [data, xField, yField, height]);

  return <svg ref={ref}></svg>;
};

export default HBarChart;
