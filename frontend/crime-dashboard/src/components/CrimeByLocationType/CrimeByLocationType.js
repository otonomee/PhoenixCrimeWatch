import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useYear } from "../../contexts/YearContext.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";
import moment from "moment";

const CrimeByLocationType = () => {
  const { year } = useYear();
  const { crimeData } = useCrimeData();
  const ref = useRef();
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, text: "" });

  useEffect(() => {
    d3.select(ref.current).selectAll("*").remove();
    const filteredData = crimeData.filter((crime) => {
      const crimeDate = moment(crime.occurred_on, "MM/DD/YYYY HH:mm");
      const crimeYear = crimeDate.year().toString();
      return crimeYear === year;
    });

    const locationTypeCounts = filteredData.reduce((acc, crime) => {
      const locationType = crime.premise_type;
      if (!acc[locationType]) {
        acc[locationType] = { total: 0, categories: {} };
      }
      acc[locationType].total++;
      acc[locationType].categories[crime.ucr_crime_category] = (acc[locationType].categories[crime.ucr_crime_category] || 0) + 1;
      return acc;
    }, {});

    const sortedLocationTypeCounts = Object.entries(locationTypeCounts)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 10);

    const pieData = sortedLocationTypeCounts.map(([premise_type, { total, categories }]) => ({
      premise_type,
      total,
      categories,
    }));
    const totalCrimes = pieData.reduce((acc, curr) => acc + curr.total, 0);
    // The rest of the pie chart code from CrimesByZipCode.js goes here...
    const svg = d3.select(ref.current);
    const width = 1200;
    const height = 475;
    const marginLbl = { top: 60, right: 0, bottom: 25, left: 200 }; // Add a top margin
    const radius = Math.min(width, height) / 2.75;

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    svg.attr("width", "auto").attr("height", height + marginLbl.top); // Add the top margin to the height

    const g = svg.append("g").attr("transform", `translate(${width / 1.8}, ${height / 2 + marginLbl.top})`); // Move the group down by the top margin

    const pie = d3.pie().value((d) => d.total);

    const path = d3
      .arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    const arc = g.selectAll(".arc").data(pie(pieData)).enter().append("g").attr("class", "arc");
    const lineStartArc = d3
      .arc()
      .innerRadius(radius * 0.95) // Make the lineStartArc slightly larger than the radius
      .outerRadius(radius * 0.95);
    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.premise_type));

    arc
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.premise_type));
    const outerArc = d3
      .arc()
      .innerRadius(radius * 1.3) // Make the outerArc larger than the radius
      .outerRadius(radius * 1.3);
    const lineEndArc = d3
      .arc()
      .innerRadius(radius * 1.2) // Make the lineEndArc smaller than the outerArc
      .outerRadius(radius * 1.2);
    arc
      .append("polyline") // Add a polyline for the callout line
      .attr("points", (d) => {
        const posA = lineStartArc.centroid(d); // Line start position
        const posB = lineEndArc.centroid(d); // Line end position
        return [posA, posB];
      })
      .style("fill", "none")
      .style("stroke", "black") // Change the color of the line to black
      .style("stroke-width", 1);

    arc
      .append("text")
      .attr("transform", (d) => {
        const [x, y] = outerArc.centroid(d); // Get the position of the label
        const xPosition = x < 0 ? x - 20 : x + 20; // Add an offset to the x position
        return `translate(${xPosition}, ${y})`;
      })
      .attr("dy", "0.35em")
      .text((d) => `${((d.data.total / totalCrimes) * 100).toFixed(1)}%`) // Change toFixed(2) to toFixed(1)
      .style("font-size", "25px")
      .style("font-weight", "bold")
      .style("fill", (d) => color(d.data.premise_type)); // Color the label with the color of the slice

    const legendItemWidth = d3.max(pieData, (d) => d.premise_type.length) * 6 + 90; // Increase the width of each legend item

    const numPerRow = Math.floor(width / legendItemWidth); // Number of items per row
    const legendItemHeight = 40; // Height of each item, adjust as needed
    const margin = 110; // Space between pie chart and legend, adjust as needed

    const numRows = Math.ceil(pieData.length / numPerRow); // Number of rows in the legend
    const svgHeight = height + margin + numRows * legendItemHeight; // Calculate SVG height

    svg.attr("width", "auto").attr("height", svgHeight); // Set SVG height

    // Add a color legend
    let legendX = 0; // Initialize x position of legend
    let legendY = 0; // Initialize y position of legend

    // Add a color legend
    const legendPadding = 10; // Add padding around each legend item

    // Add a color legend
    const legend = svg
      .append("g")
      .attr("transform", `translate(0, ${height / 6})`) // Move legend to the left of the pie chart
      .selectAll(".legend")
      .data(pieData)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(0, ${i * 40})`); // Increase vertical space between items

    legend
      .append("rect")
      .attr("x", 0)
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", (d) => color(d.premise_type));

    legend
      .append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text((d) => d.premise_type)
      .style("text-anchor", "start")
      .style("font-size", "25px")
      .style("padding", "5px");
  }, [crimeData, year]);

  return (
    <div>
      <h3 className="metric-header">Top 10 Crime Locations By Count</h3>
      <svg ref={ref}></svg>
      {tooltip.visible && (
        <div
          className="tooltip"
          style={{
            position: "absolute",
            left: tooltip.x + "px",
            top: tooltip.y + "px",
            opacity: tooltip.visible ? 0.9 : 0,
          }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
};

export default CrimeByLocationType;
