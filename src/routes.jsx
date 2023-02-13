import {
  HomeIcon,
  TruckIcon,
  UserCircleIcon,
  TableCellsIcon,
  BellIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { GiCrackedGlass } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";
import { TbDeviceCctv } from "react-icons/tb";

import {
  VehicleCounting,
  InputEndpoint,
  CrackDetection,
  AnomalyDetection,
  PenangkapanIkanTerukur,
} from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    title: "Dashboard",
    layout: "dashboard",
    pages: [
      {
        icon: <AiFillCar size={19} />,
        name: "Vehicle Counting",
        path: "/vehicle_count",
        title: "Vehicle Counting",
        element: <VehicleCounting />,
      },
      {
        icon: <GiCrackedGlass size={19} />,
        name: "Crack Detection",
        path: "/crack_detection",
        title: "Crack Detection",
        element: <CrackDetection />,
      },
      {
        icon: <TbDeviceCctv size={19} />,
        name: "Anomaly Detection",
        path: "/anomaly_detection",
        title: "Anomaly Detection",
        element: <AnomalyDetection />,
      },
      // {
      //   icon: <TruckIcon {...icon} />,
      //   name: "Penangkapan Ikan Terukur",
      //   path: "/penangkapan_ikan_terukur",
      //   title: "Penangkapan Ikan Terukur",
      //   element: <PenangkapanIkanTerukur />,
      // },
      // {
      //   icon: <HomeIcon {...icon} />,
      //   name: "dashboard",
      //   path: "/home",
      //   element: <Home />,
      // },
      // {
      //   icon: <UserCircleIcon {...icon} />,
      //   name: "profile",
      //   path: "/profile",
      //   element: <Profile />,
      // },
      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "tables",
      //   path: "/tables",
      //   element: <Tables />,
      // },
      // {
      //   icon: <BellIcon {...icon} />,
      //   name: "notifactions",
      //   path: "/notifactions",
      //   element: <Notifications />,
      // },
    ],
  },
  {
    title: "Input Endpoint",
    layout: "dashboard",
    pages: [
      {
        icon: <ArrowRightOnRectangleIcon {...icon} />,
        name: "Input Endpoint",
        path: "/input_endpoint",
        element: <InputEndpoint />,
      },
    ],
  },
];

export default routes;
