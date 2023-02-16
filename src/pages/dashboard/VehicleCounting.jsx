import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";
import ReactHlsPlayer from "react-hls-player/dist";

import NoData from "@/assets/illust/no-data.jpg";
const socket = io(`wss://socket-viana.gotos.id`);
import moment from "moment";
import io from "socket.io-client";

import VAChart from "@/components/VideoAnalytic/Chart";
import VATable from "@/components/VideoAnalytic/Table";
import Kendaraan from "@/components/VideoAnalytic/Kendaraan";

export function VehicleCounting() {
  const playerRef1 = useRef(null);

  const [chartState, setChartState] = useState(undefined);
  const [kendaraanTable, setKendaraanTable] = useState(undefined);
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("ping");
    });

    // socket.on('disconnect', () => {})

    socket.on("payload", (data) => {
      setImageUrl(data.image_url);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("payload");
    };
  }, []);

  const { data: chartData, isLoading: isLoadingChart } = useSWR(
    `https://viana.livinglab.id/api/charts`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const { data: kendaraanData, isLoading: isLoadingKendaraan } = useSWR(
    `https://viana.livinglab.id/api/kendaraan`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  const { data: cctvData } = useSWR(
    `https://viana.livinglab.id/api/cctv`,
    fetcher
  );

  useEffect(() => {
    document.title = "Vehicle Counting | VIANA";
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
        <div className="w-[45%]">
          <Card className="flex flex-col gap-12">
            <CardHeader variant="gradient" color={"green"} className="p-4">
              <img
                className="rounded-xl"
                src={imageUrl || NoData}
                width="100%"
                alt=""
              />
              <Typography className="py-2 font-sans font-medium tracking-wider">
                Hasil Video Analytic
              </Typography>
            </CardHeader>
            <CardHeader variant="gradient" color={"green"} className="p-4">
              <ReactHlsPlayer
                src="https://pelindung.bandung.go.id:3443/video/HIKSVISION/Dagsm.m3u8"
                autoPlay={true}
                controls={false}
                width="100%"
                height="auto"
                playerRef={playerRef1}
                className="rounded border-2 border-white"
              />
              <Typography className="py-2 font-sans font-medium tracking-wider">
                CCTV Asli
              </Typography>
            </CardHeader>
            <CardBody className="p-6">
              <Typography variant="h6" color="blue-gray">
                CCTV Vehicle Counting
              </Typography>
            </CardBody>
          </Card>
        </div>
        <div className="w-[55%]">
          <Card>
            <CardHeader variant="gradient" color={"green"} className="p-4">
              {chartState ? <VAChart state={chartState} /> : <Spinner />}
            </CardHeader>
            <CardBody className="p-6">
              <Typography variant="h6" color="blue-gray">
                Statistik Vehicle Couting
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
