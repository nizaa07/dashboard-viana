import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
export function CrackDetection() {
  const position = [-6.645847, 107.1665];

  function Markers() {
    const { data: crackData } = useSWR(
      `https://viana.livinglab.id/api/skpj`,
      fetcher,
      {
        refreshInterval: 1000,
      }
    );

    if (!crackData) {
      return <p>loading. . .</p>;
    }

    const thisMap = useMap();
    return (
      <>
        {crackData.map((marker, index) => {
          return (
            <Marker
              eventHandlers={{
                click: () => {
                  thisMap.setView(
                    marker.jenis_kerusakan,
                    marker.persentase_keyakinan
                  );
                },
              }}
              key={index}
              position={[marker.latitude, marker.longitude]}
            >
              <Popup>
                <p>Jenis kerusakan : {marker.jenis_kerusakan}</p>
                <p>Persentase Keyakinan : {marker.persentase_keyakinan}</p>
                <p>
                  Tanggal :{" "}
                  {marker.tanggal.replace(/T|Z/g, "  - ").slice(0, -8)}
                </p>
              </Popup>
            </Marker>
          );
        })}
      </>
    );
  }

  return (
    <div className="rounded-xl">
      <MapContainer
        style={{ height: "500px", width: "100%" }}
        center={position}
        zoom={15}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Markers />
      </MapContainer>
    </div>
  );
}

export default CrackDetection;
