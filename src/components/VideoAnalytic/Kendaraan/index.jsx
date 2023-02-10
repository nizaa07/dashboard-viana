import React, { useState, useEffect } from "react";
import useSwr from "swr";
import fetcher from "@/configs/fetcher";
import moment from "moment";

import VehicleHourly from "./kendaraanHourly";
import VehicleDaily from "./kendaraanDaily";
import VehicleWeekly from "./kendaraanWeekly";
import VehicleMonthly from "./kendaraanMonthly";
import { Card } from "@material-tailwind/react";
import Skeleton from "@/components/Skeleton";

function Kendaraan() {
  const [vehicleData, setVehicleData] = useState({
    vehicleHourly: [],
    vehicleDaily: [],
    vehicleWeekly: [],
    vehicleMonthly: [],
  });

  const [dateListHourly, setDateListHourly] = useState([]);
  const [lineDataHourly, setLineDataHourly] = useState(undefined);
  const [indexHourly, setIndexHourly] = useState(0);

  const [lineDataDaily, setLineDataDaily] = useState(undefined);
  const [yearListDaily, setYearListDaily] = useState([]);
  const [selectedMonthDaily, setSelectedMonthDaily] = useState(11);
  const [selectedYearDaily, setSelectedYearDaily] = useState(2022);
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

  const [lineDataWeekly, setLineDataWeekly] = useState(undefined);
  const [yearListWeekly, setYearListWeekly] = useState([]);
  const [selectedMonthWeekly, setSelectedMonthWeekly] = useState(11);
  const [selectedYearWeekly, setSelectedYearWeekly] = useState(2022);

  const [lineDataMonthly, setLineDataMonthly] = useState(undefined);
  const [yearListMonthly, setYearListMonthly] = useState([]);
  const [selectedYearMonthly, setSelectedYearMonthly] = useState(2022);

  const { data: vehicleHourly } = useSwr(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobilitis?pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: vehicleDaily } = useSwr(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-days?pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: vehicleWeekly } = useSwr(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-mingguans?pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: vehicleMonthly } = useSwr(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-bulanans?pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    if (vehicleHourly && vehicleDaily && vehicleWeekly && vehicleMonthly) {
      const vehicleHourlyTemp = [];
      const vehicleDailyTemp = [];
      const vehicleWeeklyTemp = [];
      const vehicleMonthlyTemp = [];

      for (const kendaraan of vehicleHourly.data) {
        vehicleHourlyTemp.push(kendaraan);
      }
      for (const kendaraan of vehicleDaily.data) {
        vehicleDailyTemp.push(kendaraan);
      }
      for (const kendaraan of vehicleWeekly.data) {
        vehicleWeeklyTemp.push(kendaraan);
      }
      for (const kendaraan of vehicleMonthly.data) {
        vehicleMonthlyTemp.push(kendaraan);
      }

      setDateListHourly([
        ...new Set(vehicleHourlyTemp.map((data) => data.date)),
      ]);
      setIndexHourly(
        [...new Set(vehicleHourlyTemp.map((data) => data.date))].length - 1
      );

      setVehicleData({
        vehicleHourly: vehicleHourlyTemp,
        vehicleDaily: vehicleDailyTemp,
        vehicleWeekly: vehicleWeeklyTemp,
        vehicleMonthly: vehicleMonthlyTemp,
      });
    }
  }, [vehicleHourly, vehicleDaily, vehicleWeekly, vehicleMonthly]);

  useEffect(() => {
    const tempData = [];
    const tempXData = [];
    const tempYData = [];

    for (const report of vehicleData.vehicleHourly) {
      if (report.date === dateListHourly[indexHourly]) {
        tempData.push(report);
      }
    }

    for (const report of tempData) {
      tempXData.push(report.time);
      tempYData.push(parseInt(report.total_kendaraan));
    }

    setLineDataHourly({
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
  }, [dateListHourly, indexHourly, vehicleData]);

  useEffect(() => {
    const tempXData = [];
    const tempYData = [];
    let tempYearList = [];

    for (const report of vehicleData.vehicleDaily) {
      const date = moment(report.date);
      tempYearList.push(date.year());
    }

    const month = selectedMonthDaily;
    const year = selectedYearDaily;

    const filteredData = vehicleData.vehicleDaily.filter((report) => {
      const date = moment(report.date);
      return date.month() === month && date.year() === year;
    });

    for (const report of filteredData) {
      const date = moment(report.date);
      tempXData.push(date);
      tempYData.push(parseInt(report.total_kendaraan));
    }

    tempYearList = [...new Set(tempYearList)];
    setYearListDaily(tempYearList);

    setLineDataDaily({
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
  }, [vehicleData, selectedMonthDaily, selectedYearDaily]);

  useEffect(() => {
    const tempXData = [];
    const tempYData = [];
    let tempYearList = [];

    for (const report of vehicleData.vehicleWeekly) {
      const date = moment(report.date);
      tempYearList.push(date.year());
    }

    const month = selectedMonthWeekly;
    const year = selectedYearWeekly;

    const filteredData = vehicleData.vehicleWeekly.filter((report) => {
      const date = moment(report.date);
      return date.month() === month && date.year() === year;
    });

    for (const report of filteredData) {
      const date = moment(report.date);
      tempXData.push(date);
      tempYData.push(parseInt(report.total_kendaraan));
    }

    tempYearList = [...new Set(tempYearList)];
    setYearListWeekly(tempYearList);

    setLineDataWeekly({
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
  }, [vehicleData, selectedMonthWeekly, selectedYearWeekly]);

  useEffect(() => {
    const tempXData = [];
    const tempYData = [];
    let tempYearList = [];

    for (const report of vehicleData.vehicleMonthly) {
      const date = moment(report.date);
      tempYearList.push(date.year());
    }

    const year = selectedYearMonthly;

    const filteredData = vehicleData.vehicleMonthly.filter((report) => {
      const date = moment(report.date);
      return date.year() === year;
    });

    for (const report of filteredData) {
      const date = moment(report.date);
      tempXData.push(date);
      tempYData.push(parseInt(report.total_kendaraan));
    }

    tempYearList = [...new Set(tempYearList)];
    setYearListMonthly(tempYearList);

    setLineDataMonthly({
      labels: tempXData.map((date) => date.format("DD MMM")),
      datasets: [
        {
          label: "Kendaraan per Bulan",
          data: tempYData,
          backgroundColor: "rgba(68, 114, 196, 0.5)",
          borderColor: "#9E9E9E",
        },
      ],
    });
  }, [vehicleData, selectedYearMonthly]);

  function next() {
    if (indexHourly < dateListHourly.length - 1) {
      setIndexHourly(indexHourly + 1);
    }
  }

  function prev() {
    if (indexHourly > 0) {
      setIndexHourly(indexHourly - 1);
    }
  }

  function onMonthDailyChange(month) {
    setSelectedMonthDaily(month);
  }

  function onYearDailyChange(year) {
    setSelectedYearDaily(year);
  }

  function onMonthWeeklyChange(month) {
    setSelectedMonthWeekly(month);
  }

  function onYearWeeklyChange(year) {
    setSelectedYearWeekly(year);
  }

  function onYearMonthlyChange(year) {
    setSelectedYearMonthly(year);
  }
  return (
    <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4">
      <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h2 className="my-4 font-sans text-xl">Total Kendaraan per Jam</h2>
        {vehicleHourly ? (
          <VehicleHourly
            data={lineDataHourly}
            dateList={dateListHourly}
            index={indexHourly}
            nextFunction={next}
            prevFucntion={prev}
          />
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h2 className="my-4 font-sans text-xl">Total Kendaraan per Hari</h2>
        {vehicleDaily ? (
          <VehicleDaily
            data={lineDataDaily}
            monthList={monthList}
            yearList={yearListDaily}
            onMonthDailyChange={onMonthDailyChange}
            onYearDailyChange={onYearDailyChange}
          />
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h2 className="my-4 font-sans text-xl">Total kendaraan per Minggu</h2>
        {vehicleWeekly ? (
          <VehicleWeekly
            data={lineDataWeekly}
            monthList={monthList}
            yearList={yearListWeekly}
            onMonthWeeklyChange={onMonthWeeklyChange}
            onYearWeeklyChange={onYearWeeklyChange}
          />
        ) : (
          <Skeleton />
        )}
      </div>
      <div className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <h2 className="my-4 font-sans text-xl">Totak Kendaraan per Bulan</h2>
        {vehicleMonthly ? (
          <VehicleMonthly
            data={lineDataMonthly}
            yearList={yearListMonthly}
            onYearMonthlyChange={onYearMonthlyChange}
          />
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
}

export default Kendaraan;
