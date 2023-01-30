import React, { useState, useEffect } from "react";
import { Button, Typography, CardHeader } from "@material-tailwind/react";
import moment from "moment";
import Chart from "react-apexcharts";

function KendaraanHourly({ data }) {
  const [dateList, setDateList] = useState([]);
  const [state, setState] = useState();
  const [lineData, setLineData] = useState(undefined);
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
  }, [data, dateList, index, state, init]);

  return (
    <div className="p-4">
      <div className="mb-4 mt-8 flex flex-row items-center justify-between">
        <Button
          color="green"
          variant="gradient"
          type="button"
          className={`rounded-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === 0 ? "invisible" : ""
          }`}
          onClick={() => {
            setIndex(() => index - 1);
          }}
        >
          <Typography>{"<"}</Typography>
        </Button>
        <div className="text-xl font-bold">
          <Typography variant="h4" color="green" textGradient>
            {dateList.length > 0
              ? moment(dateList[index]).format("DD MMMM YYYY")
              : "Loading..."}
          </Typography>
        </div>
        <Button
          color="green"
          variant="gradient"
          type="button"
          className={`rounded-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === dateList.length - 1 ? "invisible" : ""
          }`}
          onClick={() => {
            setIndex(() => index + 1);
          }}
        >
          <Typography>{">"}</Typography>
        </Button>
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

export default KendaraanHourly;
