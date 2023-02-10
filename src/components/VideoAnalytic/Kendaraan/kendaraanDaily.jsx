import React from "react";
import Chart from "react-apexcharts";

function VehicleDaily({
  data,
  monthList,
  yearList,
  onMonthDailyChange,
  onYearDailyChange,
}) {
  return (
    <div>
      <div className="mb-2 flex w-full gap-4">
        <div className="flex w-1/2 flex-col">
          <label htmlFor="month" className="text-left">
            Bulan
          </label>
          <select
            name="month"
            id="month"
            className="rounded-lg border-2 border-gray-400 p-2"
            onChange={(val) => {
              onMonthDailyChange(parseInt(val.target.value));
            }}
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
            onChange={(val) => {
              onYearDailyChange(parseInt(val.target.value));
            }}
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
      {!data ? (
        <p>Loading</p>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default VehicleDaily;
