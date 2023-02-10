import React from "react";
import Chart from "react-apexcharts";
import moment from "moment";

function VehicleHourly({ data, dateList, index, nextFunction, prevFucntion }) {
  return (
    <div>
      <div className="mb-4 flex flex-row items-center justify-between">
        <button
          type="button"
          className={`rounded-md border-r border-gray-100 bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === 0 ? "invisible" : ""
          }`}
          onClick={prevFucntion}
        >
          {"<"}
        </button>
        <div className="text-xl font-bold">
          {dateList.length > 0
            ? moment(dateList[index]).format("DD MMMM YYYY")
            : "loading..."}
        </div>
        <button
          type="button"
          className={`booder-gray-100 rounded-md border-r bg-gray-800 py-2 px-3 text-white hover:bg-red-700 hover:text-white ${
            index === dateList.length - 1 ? "invisible" : ""
          }`}
          onClick={nextFunction}
        >
          {">"}
        </button>
      </div>
      <div>
        {data ? (
          <Chart
            options={{
              chart: {
                id: "basic-bar",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                categories: data.labels,
              },
            }}
            series={[
              {
                name: "series-1",
                data: data.datasets[0].data,
              },
            ]}
            type="line"
            height={400}
          />
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
}

export default VehicleHourly;
