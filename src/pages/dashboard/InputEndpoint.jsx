import React, { useState } from "react";
import { Card, Input, Button, Alert } from "@material-tailwind/react";

export function InputEndpoint() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "text/plain");
  const [alertHandler, setAlertHandler] = useState(true);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [alertColor, setAlertColor] = useState();
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
    setLoading(true);
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
      let resJson = await res;
      console.log(resJson.status);

      if (res.status === 201) {
        setMessage("Date Succesfully Send");
        console.log(message);
        setAlertColor("green");
        setLoading(false);
        setAlertHandler(!alertHandler);
      } else {
        setAlertColor("red");
        setMessage("An error Ocurred");
        setLoading(false);
        setAlertHandler(!alertHandler);
      }
    } catch (err) {
      console.log(err);
      setAlertColor("red");
      setMessage("An error Ocurredddd");
      setLoading(false);
      setAlertHandler(!alertHandler);
    }
  };

  const spinner = (
    <div role="status">
      <svg
        aria-hidden="true"
        class="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  );
  console.log(alertHandler);

  return (
    <div>
      <Card className="p-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4" action="">
          <div>
            {message ? (
              <Alert show={alertHandler} color={alertColor}>
                <div className="flex items-center justify-between">
                  <p>{message}</p>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setAlertHandler(!alertHandler);
                    }}
                  >
                    x
                  </button>
                </div>
              </Alert>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              Lokasi Tempat
            </label>
            <Input
              required
              onChange={nameHandler}
              size="md"
              label="Lokasi Tempat"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-sans">
              URL RTSP
            </label>
            <Input required onChange={urlHandler} size="md" label="URL RTSP" />
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
          <div className="flex items-center gap-2">
            <Button type="submit">Submit</Button>
            {loading ? spinner : null}
          </div>
        </form>
        <div className="rounded-lg bg-gray-200"></div>
      </Card>
    </div>
  );
}

export default InputEndpoint;
