import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useYear } from "../../contexts/YearContext.js";
import { useCrimeData } from "../../contexts/CrimeDataContext.js";

const CrimesByZipCode = () => {
  const { year } = useYear();
  const { crimeData } = useCrimeData();
  const ref = useRef();
  const [tooltip, setTooltip] = useState({ x: 0, y: 0, visible: false, text: "" });

  useEffect(() => {
    const filteredData = crimeData.filter((crime) => {
      const crimeYear = new Date(crime.occurred_on).getFullYear().toString();
      return crimeYear === year;
    });

    const zipCounts = filteredData.reduce((acc, crime) => {
      acc[crime.zip] = acc[crime.zip] || { total: 0, categories: {} };
      acc[crime.zip].total += 1;
      acc[crime.zip].categories[crime.ucr_crime_category] = (acc[crime.zip].categories[crime.ucr_crime_category] || 0) + 1;
      return acc;
    }, {});

    console.log(zipCounts);

    const sortedZipCounts = Object.entries(zipCounts)
      .sort((a, b) => b[1].total - a[1].total)
      .slice(0, 10);

    const pieData = sortedZipCounts.map(([zip, { total, categories }]) => ({
      zip,
      total,
      categories,
    }));

    // Setup the SVG
    d3.select(ref.current).selectAll("*").remove(); // Clear previous SVG content
    const svg = d3.select(ref.current),
      width = 400,
      height = 400,
      radius = Math.min(width, height) / 2;

    svg.attr("width", width).attr("height", height);

    const g = svg.append("g").attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie().value((d) => d.total);

    const path = d3.arc().outerRadius(radius).innerRadius(0);
    const label = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(radius - 80);

    const arcs = g.selectAll(".arc").data(pie(pieData)).enter().append("g").attr("class", "arc");

    arcs
      .append("path")
      .attr("d", path)
      .attr("fill", (d) => color(d.data.zip));

    arcs
      .append("text")
      .attr("transform", (d) => `translate(${label.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text((d) => d.data.zip)
      .style("font-size", "18px") // Increased size
      .style("font-weight", "bold") // Bold font
      .attr("fill", "white"); // Change as needed

    // Add a custom tooltip using div elements
    arcs
      .on("mouseenter", (event, d) => {
        setTooltip({
          x: event.pageX,
          y: event.pageY - 28,
          visible: true,
          text: (
            <div>
              <p>Zip: {d.data.zip}</p>
              <p>Total: {d.data.total}</p>
              {d.data.categories &&
                typeof d.data.categories === "object" &&
                Object.entries(d.data.categories).map(([category, count]) => (
                  <p key={category}>
                    {category}: {count}
                  </p>
                ))}
            </div>
          ),
        });
      })
      .on("mouseleave", () => {
        setTooltip({ ...tooltip, visible: false });
      });
  }, [crimeData, year, tooltip]);

  return (
    <div>
      <h3>Top 10 Zip Codes (Crime Counts) {year}</h3>
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

export default CrimesByZipCode;
