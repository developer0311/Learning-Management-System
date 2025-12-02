import React from "react";
import { Chart } from "react-google-charts";

const data = [
  ["Day", "Hours Studied", { role: "style" }],
  ["Mon", 2, "#5B3DF8"],
  ["Tue", 3, "#7C5CFF"],
  ["Wed", 1, "#A18CFF"],
  ["Thu", 4, "#CBBEFF"],
  ["Fri", 2, "#8A7BFF"],
  ["Sat", 5, "#5B3DF8"],
  ["Sun", 3, "#7C5CFF"],
];

const options = {
  title: "Weekly Learning Progress (Hours)",
  backgroundColor: "transparent",
  chartArea: { width: "70%", height: "70%" },
  legend: { position: "none" },
  bar: { groupWidth: "55%" },
  hAxis: {
    title: "Days of the Week",
    textStyle: { color: "#6b6b6b", fontSize: 12 },
    titleTextStyle: { color: "#888" },
  },
  vAxis: {
    title: "Hours Studied",
    minValue: 0,
    gridlines: { color: "#e5e5e5" },
    textStyle: { color: "#6b6b6b", fontSize: 12 },
    titleTextStyle: { color: "#888" },
  },
  tooltip: { textStyle: { color: "#333" }, showColorCode: true },
};

function LearningChart() {
  return (
    <div
      style={{
        width: "100%",
        height: "300px",
        background: "white",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.05)",
      }}
    >
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="100%"
        data={data}
        options={options}
      />
    </div>
  );
}


export default LearningChart