import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";

import NoData from "@/assets/illust/no-data.jpg";
const socket = io(`wss://socket-viana.gotos.id`);
import io from "socket.io-client";

import VAChart from "@/components/VideoAnalytic/Chart";
import VATable from "@/components/VideoAnalytic/Table";
import KendaraanHourly from "@/components/VideoAnalytic/Kendaraan/KendaraanHourly";

export function VehicleCounting() {
  const playerRef1 = useRef(null);
  const [imageUrl, setImageUrl] = useState();

  const [chartState, setChartState] = useState(undefined);
  const [kendaraanTable, setKendaraanTable] = useState(undefined);
  const [kendaraanState, setKendaraanState] = useState(undefined);

  const { data: chartData } = useSWR(`http://localhost:4100/charts`, fetcher, {
    refreshInterval: 1000,
  });
  const { data: kendaraanData } = useSWR(
    `http://localhost:4100/kendaraan`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const { data: kendaraanPerJam } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobilitis?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  const { data: kendaraanPerHari } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-days?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: kendaraanPerMinggu } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-mingguans?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: kendaraanPerBulan } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-bulanans?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    if (chartData && kendaraanData) {
      setChartState({
        date: chartData.date,
        sepeda: chartData.sepeda,
        truk: chartData.truk,
        motor: chartData.motor,
        mobil: chartData.mobil,
        bus: chartData.bus,
      });
      setKendaraanTable(kendaraanData);
    }
    if (
      kendaraanPerJam &&
      kendaraanPerHari &&
      kendaraanPerMinggu &&
      kendaraanPerBulan
    ) {
      const kendaraanPerJamTemp = [];
      for (const kendaraan of kendaraanPerJam.data) {
        const tempkendaraan = kendaraan;
        kendaraanPerJamTemp.push(tempkendaraan);
      }
      const kendaraanPerHariTemp = [];
      for (const kendaraan of kendaraanPerHari.data) {
        const tempkendaraan = kendaraan;
        kendaraanPerHariTemp.push(tempkendaraan);
      }
      const kendaraanPerMingguTemp = [];
      for (const kendaraan of kendaraanPerMinggu.data) {
        const tempKendaraan = kendaraan;
        kendaraanPerMingguTemp.push(tempKendaraan);
      }
      const kendaraanPerBulanTemp = [];
      for (const kendaraan of kendaraanPerBulan.data) {
        const tempKendaraan = kendaraan;
        kendaraanPerBulanTemp.push(tempKendaraan);
      }
      kendaraanPerJamTemp.reverse();
      kendaraanPerHariTemp.reverse();
      kendaraanPerMingguTemp.reverse();
      kendaraanPerBulanTemp.reverse();
      setKendaraanState({
        kendaraanPerJam: kendaraanPerJamTemp,
        kendaraanPerHari: kendaraanPerHariTemp,
        kendaraanPerMinggu: kendaraanPerMingguTemp,
        kendaraanPerBulan: kendaraanPerBulanTemp,
      });
    }
  }, [
    chartData,
    kendaraanData,
    kendaraanPerJam,
    kendaraanPerHari,
    kendaraanPerMinggu,
    kendaraanPerBulan,
  ]);

  const Spinner = () => {
    return (
      <div role="status" class="max-w-full animate-pulse p-8">
        <div class="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div class="h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </div>
    );
  };

  return (
    <Fragment>
      <div className="mt-12 flex gap-2">
        <div className="w-1/3">
          <Card>
            <CardHeader variant="gradient" color={"green"} className="p-4">
              <img
                className="rounded-xl"
                src={imageUrl || NoData}
                width="100%"
                alt=""
              />
            </CardHeader>
            <CardBody className="p-6">
              <Typography variant="h6" color="blue-gray">
                CCTV Vehicle Counting
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
                debitis laudantium similique incidunt. Neque, sapiente. Commodi
                soluta ex, voluptas quam consequuntur laboriosam adipisci maxime
                accusamus rem animi deserunt, ad quidem.
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="w-2/3">
          <Card>
            <CardHeader variant="gradient" color={"green"} className="p-4">
              {chartState ? <VAChart state={chartState} /> : <Spinner />}
            </CardHeader>
            <CardBody className="p-6">
              <Typography variant="h6" color="blue-gray">
                Statistik Vehicle Couting
              </Typography>
              <Typography
                variant="small"
                className="font-normal text-blue-gray-600"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt dignissimos consequatur qui, dicta rem nihil eius illum
                accusantium voluptatibus ab voluptate tempora quae
                exercitationem ad labore aperiam, est placeat pariatur?
              </Typography>
            </CardBody>
          </Card>
        </div>
      </div>

      <div className="my-6">
        <Card>
          {chartState ? <VATable state={kendaraanTable} /> : <Spinner />}
        </Card>
      </div>

      <div>
        <Card>
          {/* {kendaraanState ? (
            <KendaraanHourly data={kendaraanState.kendaraanPerJam} />
          ) : (
            <div>Loading...</div>
          )} */}
        </Card>
      </div>
    </Fragment>
  );
}

export default VehicleCounting;
