import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

function VATable({ state }) {
  const tableRow = ["Tanggal", "Sepeda", "Motor", "Mobil", "Bus", "Truk"];
  const data = state;
  console.log(data.date);
  return (
    <table>
      <thead>
        <tr>
          {tableRow.map((el) => {
            return (
              <th className="border-b border-blue-gray-50 py-3 px-5 text-center">
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase text-blue-gray-400"
                >
                  {el}
                </Typography>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.date.map((item, idx) => (
          <tr key={idx} className="text-center">
            <th>
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {item}
              </Typography>
            </th>
            <td className="py-3 px-5">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {data.sepeda[idx]}
              </Typography>
            </td>
            <td className="py-3 px-5">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {data.motor[idx]}
              </Typography>
            </td>
            <td className="py-3 px-5">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {data.mobil[idx]}
              </Typography>
            </td>
            <td className="py-3 px-5">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {data.bus[idx]}
              </Typography>
            </td>
            <td className="py-3 px-5">
              <Typography className="text-xs font-semibold text-blue-gray-600">
                {data.truk[idx]}
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default VATable;
