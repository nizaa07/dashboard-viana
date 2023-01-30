import { useState, useEffect } from "react";
import moment from "moment";
import React from "react";

function KendaraanHourly({ data }) {
  const [dateList, setDateList] = useState([]);
  const [lineData, setLineData] = useState();
  const [index, setIndex] = useState(0);
  const [init, setInit] = useState(true);

  useEffect(() => {
    const tempData = [];
    const tempXData = [];
    const tempYData = [];
    if (dateList.length === 0) {
      setDateList([...new Set(data.map((data) => data.date))]);
    } else {
      if (init) {
        setIndex(() => dateList.length - 1);
        setInit(false);
      }
    }
    for (const report of data) {
      if (report.date === dateList[index]) {
        tempData.push(report);
      }
    }
    for (const report of tempData) {
      tempXData.push(report.time);
      tempYData.push(parseInt(report.total_kendaraan));
    }
    setLineData({
      labels: tempXData,
      datasets: [
        {
          label: "Kendaraan per Jam",
          data: tempYData,
          backgroundColor: "rgba(68, 114, 196, 0.5)",
          borderColor: "#9E9E9E",
        },
      ],
    });
    setState({ xData: tempXData, yData: tempYData });
    stateTemp({ xData: tempXData, yData: tempYData });
  }, [data]);

  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <button
          type="button"
          className={`rounded-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === 0 ? "invisible" : ""
          }`}
          onClick={() => {
            setIndex(() => index - 1);
          }}
        >
          {"<"}
        </button>
        <div className="text-xl font-bold">
          {dateList.length > 0
            ? moment(dateList[index]).format("DD MMMM YYYY")
            : "Loading..."}
        </div>
        <button
          type="button"
          className={`rounded-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === dateList.length - 1 ? "invisible" : ""
          }`}
          onClick={() => {
            setIndex(() => index + 1);
          }}
        >
          {">"}
        </button>
        <div></div>
      </div>
    </div>
  );
}

export default KendaraanHourly;
