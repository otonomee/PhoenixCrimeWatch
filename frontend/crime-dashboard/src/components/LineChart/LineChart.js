import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const LineChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const xScale = d3.scaleLinear().domain([0, data.length]).range([0, 400]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([400, 0]);
    const line = d3
      .line()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d));

    svg.append("path").datum(data).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 1.5).attr("d", line);
  }, [data]);

  return <svg ref={ref} width={500} height={500} />;
};

export default LineChart;
