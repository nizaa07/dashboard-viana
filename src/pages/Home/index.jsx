import React, { useEffect, useState, useRef } from "react";
import useSWR from "swr";
import moment from "moment";
import ReactHlsPlayer from "react-hls-player/dist";
import io from "socket.io-client";

const socket = io(`wss://socket-viana.gotos.id`);

function Home() {
  const [date, setDate] = useState([]);
  const [sepeda, setSepeda] = useState([]);
  const [motor, setMotor] = useState([]);
  const [mobil, setMobil] = useState([]);
  const [bus, setBus] = useState([]);
  const [truk, setTruk] = useState([]);
  const [state, setState] = useState({
    labels: [""],
    datasets: [
      {
        label: "props.name",
        data: [0, 0, 0, 0, 0],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "#9E9E9E",
      },
    ],
  });

  const [imageUrl, setImageUrl] = useState();
  const playerRef1 = useRef(null);
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

  async function fetcher(url) {
    const res = await fetch(url);
    return res.json();
  }
  const { data: rawData } = useSWR(`https://rest-viana.gotos.id/charts`, fetcher, {
    refreshInterval: 1000,
  });
  useEffect(() => {
    if (rawData) {
      setDate(rawData.date.split(",").map((item) => moment(item).format("MMMM Do YYYY, h:mm:ss a")));
      setSepeda(rawData.sepeda.split(",").map((item) => parseInt(item)));
      setMotor(rawData.motor.split(",").map((item) => parseInt(item)));
      setMobil(rawData.mobil.split(",").map((item) => parseInt(item)));
      setBus(rawData.bus.split(",").map((item) => parseInt(item)));
      setTruk(rawData.truk.split(",").map((item) => parseInt(item)));
      setState({
        labels: date,
        datasets: [
          {
            label: "Sepeda",
            data: sepeda,
            backgroundColor: "rgb(51, 101, 138)",
            borderColor: "#9E9E9E",
          },
          {
            label: "Motor",
            data: motor,
            backgroundColor: "rgb(134, 187, 216)",
            borderColor: "#9E9E9E",
          },
          {
            label: "Mobil",
            data: mobil,
            backgroundColor: "rgb(117, 142, 79)",
            borderColor: "#9E9E9E",
          },
          {
            label: "Bus",
            data: bus,
            backgroundColor: "rgb(246, 174, 45)",
            borderColor: "#9E9E9E",
          },
          {
            label: "Truk",
            data: truk,
            backgroundColor: "rgb(242, 100, 25)",
            borderColor: "#9E9E9E",
          },
        ],
      });
    }
  }, [date, sepeda, motor, mobil, bus, truk, rawData]);

  return (
    <div className="text-3xl font-bold underline">
      <p>CCTV</p>
      <div className="min-w-0 max-w-full relative w-1/3 px-[0.75rem] border-2 border-purple-800">
        <ReactHlsPlayer src="http://45.118.114.26:80/camera/Cikapayang1.m3u8" autoPlay={true} controls={false} width="100%" height="auto" playerRef={playerRef1} />
      </div>
    </div>
  );
}

export default Home;
