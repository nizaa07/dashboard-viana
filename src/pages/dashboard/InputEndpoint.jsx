import React, { useState } from "react";
import { Card, Input, Button } from "@material-tailwind/react";

export function InputEndpoint() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  const [message, setMessage] = useState();
  const [input, setInput] = useState({
    id_user: "",
    name: "",
    rtsp_url: "",
  });

  let nameHandler = (e) => {
    e.preventDefault();
    setInput({ ...input, name: e.target.value });
  };
  let urlHandler = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      rtsp_url: e.target.value,
    });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:4100/addCC", {
        headers: myHeaders,
        method: "POST",
        body: JSON.stringify({
          id_user: 17,
          name: input.name,
          rtsp_url: input.rtsp_url,
        }),
        redirect: "follow",
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setMessage("Date Succesfully Send");
      } else {
        setMessage("An error Ocurred");
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(input);

  return (
    <div>
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Lokasi Tempat
            </label>
            <Input onChange={nameHandler} size="md" label="Lokasi Tempat" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              URL RTSP
            </label>
            <Input onChange={urlHandler} size="md" label="URL RTSP" />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Latitude
            </label>
            <Input size="md" label="Latitude" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Longitude
            </label>
            <Input size="md" label="Longitude" />
          </div> */}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
        <div className="rounded-lg bg-gray-200"></div>
      </Card>
    </div>
  );
}

export default InputEndpoint;
