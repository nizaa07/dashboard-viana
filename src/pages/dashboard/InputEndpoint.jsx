import React from "react";
import { Card, Input, Button } from "@material-tailwind/react";

export function InputEndpoint() {
  return (
    <div>
      <Card className="p-4">
        <form className="flex flex-col gap-4" action="">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Lokasi Tempat
            </label>
            <Input size="md" label="Lokasi Tempat" />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              URL RTSP
            </label>
            <Input size="md" label="URL RTSP" />
          </div>
          <div className="flex flex-col gap-2">
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
          </div>
          <div>
            <Button>Submit</Button>
          </div>
        </form>
        <div className="rounded-lg bg-gray-200"></div>
      </Card>
    </div>
  );
}

export default InputEndpoint;
