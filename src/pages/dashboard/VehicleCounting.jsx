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
import Kendaraan from "@/components/VideoAnalytic/Kendaraan";

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
    document.title = "Vehicle Counting";
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
  }, [chartData, kendaraanData]);

  const Spinner = () => {
    return (
      <div role="status" className="max-w-full animate-pulse p-8">
        <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2.5 h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 max-w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
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
        <Kendaraan />
      </div>
    </Fragment>
  );
}

export default VehicleCounting;
