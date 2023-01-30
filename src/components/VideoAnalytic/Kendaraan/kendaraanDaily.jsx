import React, { useState, useEffect, useRef } from "react";
import { Button, Typography, CardHeader } from "@material-tailwind/react";
import Chart from "react-apexcharts";
import moment from "moment";

function KendaraanDaily({ data }) {
  const [state, setState] = useState();
  const [lineData, setLineData] = useState();
  const [yearList, setYearList] = useState([]);
  const selectedYear = useRef(null);
  const selectedMonth = useRef(null);
  const [filteredData, setFilteredData] = useState(data);
  const [userSelected, setUserSelected] = useState(false);
  const [init, setInit] = useState(true);
  const monthList = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  useEffect(() => {
    const tempXData = [];
    const tempYData = [];
    let tempYearList = [];

    for (const report of filteredData) {
      const date = moment(report.date);
      tempXData.push(date);
      tempYData.push(parseInt(report.total_kendaraan));
    }
    for (const report of data) {
      const date = moment(report.date);
      tempYearList.push(date.year());
    }
    tempYearList = [...new Set(tempYearList)];
    if (selectedMonth.current && selectedYear.current) {
      let month;
      let year;
      if (!init) {
        month = parseInt(selectedMonth.current.value);
        year = parseInt(selectedYear.current.value);
      } else {
        month = moment().month();
        year = moment().year();
        setInit(false);
      }
      const filteredData = data.filter((report) => {
        const date = moment(report.date);
        return date.month() === month && date.year() === year;
      });
      setFilteredData(filteredData);
    }
    setYearList(tempYearList);
    setLineData({
      labels: tempXData.map((date) => date.format("DD MMM")),
      datasets: [
        {
          label: "Kendaraan per Hari",
          data: tempYData,
          backgroundColor: "rgba(68, 114, 196, 0.5)",
          borderColor: "#9E9E9E",
        },
      ],
    });
    setState({ xData: tempXData, yData: tempYData });
  }, [data, state, userSelected, filteredData, init]);

  return (
    <div className="p-4">
      <div className="mb-2 flex w-full gap-4">
        <div className="flex w-1/2 flex-col">
          <label htmlFor="month" className="text-left">
            Bulan
          </label>
          <select
            name="month"
            id="month"
            className="rounded-lg border-2 border-gray-400 p-2"
            ref={selectedMonth}
            onChange={() => setUserSelected(true)}
          >
            {monthList.map((date, index) => {
              return (
                <option
                  value={index}
                  key={index}
                  selected={index === monthList.length - 1 ? true : false}
                >
                  {date}
                </option>
              );
            })}
          </select>
        </div>
        <div className="flex w-1/2 flex-col">
          <label htmlFor="year" className="text-left">
            Tahun
          </label>
          <select
            name="year"
            id="year"
            className="rounded-lg border-2 border-gray-400 p-2"
            ref={selectedYear}
            onChange={() => setUserSelected(true)}
          >
            {yearList.map((date, index) => {
              return (
                <option
                  value={date}
                  key={index}
                  selected={index === yearList.length - 1 ? true : false}
                >
                  {date}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        {!lineData ? (
          <p>Loading</p>
        ) : (
          <>
            <Chart
              options={{
                chart: {
                  id: "basic-bar",
                },
                xaxis: {
                  categories: lineData.labels,
                },
              }}
              series={[
                {
                  name: "series-1",
                  data: lineData.datasets[0].data,
                },
              ]}
              type="line"
              height={400}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default KendaraanDaily;
