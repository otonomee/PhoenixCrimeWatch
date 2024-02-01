import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const BarChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const xScale = d3.scaleBand().range([0, 500]).padding(0.4);
    const yScale = d3.scaleLinear().range([500, 0]);

    xScale.domain(data.map((d) => d.crime_category));
    yScale.domain([0, d3.max(data, (d) => d.count)]);

    svg.append("g").attr("transform", "translate(0, 500)").call(d3.axisBottom(xScale));

    svg.append("g").call(d3.axisLeft(yScale));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xScale(d.crime_category))
      .attr("y", (d) => yScale(d.count))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => 500 - yScale(d.count));
  }, [data]);

  return <svg ref={ref} />;
};

export default BarChart;
