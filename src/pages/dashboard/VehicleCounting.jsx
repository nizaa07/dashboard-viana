import React, { Fragment, useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import useSWR from "swr";
import moment from "moment";
import fetcher from "@/configs/fetcher";
import VAChart from "@/components/VideoAnalytic/Chart";
import VATable from "@/components/VideoAnalytic/Table";

import NoData from "@/assets/illust/no-data.jpg";
const socket = io(`wss://socket-viana.gotos.id`);
import io from "socket.io-client";

export function VehicleCounting() {
  const playerRef1 = useRef(null);
  const [imageUrl, setImageUrl] = useState();

  const [date, setDate] = useState([]);
  const [sepeda, setSepeda] = useState([]);
  const [motor, setMotor] = useState([]);
  const [mobil, setMobil] = useState([]);
  const [bus, setBus] = useState([]);
  const [truk, setTruk] = useState([]);
  const [state, setState] = useState(undefined);

  const { data: rawData } = useSWR(`http://localhost:4100/charts`, fetcher, {
    refreshInterval: 1000,
  });

  useEffect(() => {
    if (rawData) {
      const date = rawData.date
        .split(",")
        .map((item) => moment(item).format("MMMM Do YYYY, h:mm :ss a"));
      const sepeda = rawData.sepeda.split(",").map((item) => parseInt(item));
      const motor = rawData.motor.split(",").map((item) => parseInt(item));
      const mobil = rawData.mobil.split(",").map((item) => parseInt(item));
      const bus = rawData.bus.split(",").map((item) => parseInt(item));
      const truk = rawData.truk.split(",").map((item) => parseInt(item));
      setDate(sepeda);
      setSepeda(motor);
      setMotor(mobil);
      setMobil(bus);
      setBus(truk);
      setTruk(date);

      setState({
        sepeda: sepeda,
        motor: motor,
        mobil: mobil,
        bus: bus,
        truk: truk,
        date: date,
      });
    }
  }, [rawData]);
  console.log(state);
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
              {state ? <VAChart state={state} /> : <p>loading</p>}
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
            {/* <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
              footer
            </CardFooter> */}
          </Card>
        </div>
      </div>

      <div className="my-6">
        <Card>{state ? <VATable state={state} /> : <p>loading</p>}</Card>
      </div>
    </Fragment>
  );
}

export default VehicleCounting;
