import React, { useState, useEffect } from "react";
import useSWR from "swr";
import fetcher from "@/configs/fetcher";

import KendaraanHourly from "./kendaraanHourly";
import KendaraanDaily from "./kendaraanDaily";
import KendaraanWeekly from "./kendaraanWeekly";
import KendaraanMonthly from "./kendaraanMonthly";
import { Card } from "@material-tailwind/react";

function Kendaraan() {
  const [kendaraanState, setKendaraanState] = useState(undefined);
  const { data: kendaraanPerJam } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobilitis?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );
  const { data: kendaraanPerHari } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-days?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: kendaraanPerMinggu } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-mingguans?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  const { data: kendaraanPerBulan } = useSWR(
    `https://api.issp.sccic-dev.com/api/ll-ddg-analitik-mobiliti-bulanans?sort=createdAt%3Adesc&pagination[limit]=2000`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  useEffect(() => {
    if (
      kendaraanPerJam &&
      kendaraanPerHari &&
      kendaraanPerMinggu &&
      kendaraanPerBulan
    ) {
      const kendaraanPerJamTemp = [];
      for (const kendaraan of kendaraanPerJam.data) {
        const tempkendaraan = kendaraan;
        kendaraanPerJamTemp.push(tempkendaraan);
      }
      const kendaraanPerHariTemp = [];
      for (const kendaraan of kendaraanPerHari.data) {
        const tempkendaraan = kendaraan;
        kendaraanPerHariTemp.push(tempkendaraan);
      }
      const kendaraanPerMingguTemp = [];
      for (const kendaraan of kendaraanPerMinggu.data) {
        const tempKendaraan = kendaraan;
        kendaraanPerMingguTemp.push(tempKendaraan);
      }
      const kendaraanPerBulanTemp = [];
      for (const kendaraan of kendaraanPerBulan.data) {
        const tempKendaraan = kendaraan;
        kendaraanPerBulanTemp.push(tempKendaraan);
      }
      kendaraanPerJamTemp.reverse();
      kendaraanPerHariTemp.reverse();
      kendaraanPerMingguTemp.reverse();
      kendaraanPerBulanTemp.reverse();
      setKendaraanState({
        kendaraanPerJam: kendaraanPerJamTemp,
        kendaraanPerHari: kendaraanPerHariTemp,
        kendaraanPerMinggu: kendaraanPerMingguTemp,
        kendaraanPerBulan: kendaraanPerBulanTemp,
      });
    }
  }, [
    kendaraanPerJam,
    kendaraanPerHari,
    kendaraanPerMinggu,
    kendaraanPerBulan,
  ]);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="mt-2">
        {kendaraanState ? (
          <KendaraanHourly data={kendaraanState.kendaraanPerJam} />
        ) : (
          <p>loading</p>
        )}
      </Card>
      <Card className="mt-2">
        {kendaraanState ? (
          <KendaraanDaily data={kendaraanState.kendaraanPerHari} />
        ) : (
          <p>loading</p>
        )}
      </Card>
      <Card className="mt-2">
        {kendaraanState ? (
          <KendaraanWeekly data={kendaraanState.kendaraanPerMinggu} />
        ) : (
          <p>loading</p>
        )}
      </Card>
      <Card className="mt-2">
        {kendaraanState ? (
          <KendaraanMonthly data={kendaraanState.kendaraanPerBulan} />
        ) : (
          <p>loading</p>
        )}
      </Card>
    </div>
  );
}

export default Kendaraan;
