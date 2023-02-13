import React from "react";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";

export function AnomalyDetection() {
  const { data: anomalyData } = useSWR(
    `https://viana.livinglab.id/api/anomaly`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  if (!anomalyData) {
    return <p>Loading. . .</p>;
  }
  return (
    <>
      <div className="grid grid-cols-3 gap-8">
        {anomalyData.map((marker, index) => {
          console.log(marker.image.data.toString("base64"));
          return (
            <div className=" drop-shadow-m rounded bg-green-400 p-2 font-sans text-white">
              <img src={marker.image.data.toString("base64")} alt="image" />
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
