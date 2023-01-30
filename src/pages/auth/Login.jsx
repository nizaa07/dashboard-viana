import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import LivinglabLogo from "../../../public/img/livinglab.png";

export function Login() {
  return (
    <div className="max-w-screen m-auto flex min-h-screen flex-col justify-center bg-green-400">
      <div className="m-auto">
        <div className="flex items-center justify-center gap-6 p-8">
          <img className="w-1/6" src={LivinglabLogo} alt="" />
          <Typography className="text-xl font-semibold text-white">
            Dashboard VIANA
          </Typography>
        </div>
        <Card className="p-20">
          <Typography className="text-xl font-bold">Login</Typography>
          <CardBody>
            <a href="https://sso.issp.sccic-dev.com/login?app_id=63d22ce236ccee7566553862&redirect_uri=https://localhost:5173/dashboard/vehicle_count">
              <Button fullWidth color="green">
                Login with SSO
              </Button>
            </a>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default Login;
