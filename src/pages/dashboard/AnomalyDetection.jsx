import React from "react";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";
import Anomaly1 from "@/assets/anomaly-img/1.png";
import Anomaly2 from "@/assets/anomaly-img/2.png";
import Anomaly3 from "@/assets/anomaly-img/3.png";
import Anomaly4 from "@/assets/anomaly-img/4.png";
import Anomaly5 from "@/assets/anomaly-img/5.png";

export function AnomalyDetection() {
  document.title = "Anomaly Detection | VIANA";
  const { data: anomalyData, isLoading } = useSWR(
    `https://viana.livinglab.id/api/anomaly`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (isLoading) {
    return <p>Loading. . .</p>;
  }

  const imgOrder = [
    { name: 1, img: Anomaly1 },
    { name: 2, img: Anomaly2 },
    { name: 3, img: Anomaly3 },
    { name: 4, img: Anomaly4 },
    { name: 5, img: Anomaly5 },
  ];

  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {anomalyData.map((marker, index) => {
          console.log(marker.image.data.toString("base64"));
          return (
            <div className=" drop-shadow-m rounded bg-green-400 p-2 font-sans text-white">
              <img
                className="rounded-xl"
                src={imgOrder[index].img}
                alt="image"
              />
              <p>Jenis Anomali : {marker.jenis_anomali}</p>
              <p>Jumlah : {marker.count}</p>
              <p>
                Tanggal :{" "}
                {marker.timestamps.replace(/T|Z/g, "  - ").slice(0, -8)}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AnomalyDetection;
