import React from "react";
import Chart from "react-apexcharts";

function VAChart({ state }) {
  let series = [
    {
      name: "Sepeda",
      data: state.sepeda,
    },
    {
      name: "Motor",
      data: state.motor,
    },
    {
      name: "Mobil",
      data: state.mobil,
    },
    {
      name: "Bus",
      data: state.bus,
    },
    {
      name: "Truk",
      data: state.truk,
    },
  ];
  let options = {
    colors: ["#F44336", "#E91E63", "#9C27B0"],
    chart: {
      type: "bar",
      height: 430,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          position: "top",
        },
      },
    },
    dataLabels: {
      enabled: true,
      offsetX: -6,
      style: {
        fontSize: "12px",
        colors: ["#fff"],
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
    },
    xaxis: {
      categories: state.date,
      labels: {
        style: {
          colors: "#fff",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
    yaxis: {
      labels: {
        maxWidth: 200,
        style: {
          colors: "#fff",
          fontFamily: "sans-serif",
          fontSize: "13px",
          fontFamily: "inherit",
          fontWeight: 300,
        },
      },
    },
  };
  return (
    <>
      <div className="text-gray-800">
        <Chart options={options} series={series} type="bar" height={430} />
      </div>
    </>
  );
}

export default VAChart;
