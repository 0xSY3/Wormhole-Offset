import { getDeviceDetail, getNotarizations } from "@/apis";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import { useToast } from "@/components/ui/use-toast";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Icons } from "@/components/icons";
import { DeviceInfo, Notarization } from "@/interface";
// import { ScrollArea } from "@radix-ui/react-scroll-area";

export default function DeviceDetail() {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState<DeviceInfo | null>();
  const [notarizedData, setNotarizedData] = useState<Notarization[] | null>();
  console.log(data);
  // const { toast } = useToast();

  const getNotarization = async () => {
    try {
      setIsLoading(true);
      const res = await getNotarizations();
      setNotarizedData(res);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const getData = async () => {
    if (id) {
      try {
        setIsLoading(true);
        const apiData = await getDeviceDetail(Number(id)); // Ensure ID is a number
        if (apiData === null) {
          console.error("No data received from API", apiData);
          setData(null);
        } else {
          setData(apiData);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.error("Invalid ID");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);
  useEffect(() => {
    getNotarization();
  }, []);
  return (
    <DashboardLayout loading={isLoading}>
      <Card className="w-[95%]">
        <CardHeader>
          <CardTitle>
            Device SONOFF-ELLITE
            {/* {data.manufacturer.toUpperCase()} */}
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm ">
            <strong>Address: </strong> {data?.city}
          </p>
          <p className="text-sm ">
            <strong>Machine Id: </strong> {data?.accountId}
          </p>
          <p className="text-sm ">
            <strong>Location: </strong> {data?.city.toUpperCase()},{" "}
            {data?.region.toUpperCase()} - {data?.country}
          </p>
          <p className="text-sm ">
            <strong>User ID: </strong> {data?.id}
          </p>
        </CardContent>
      </Card>
      {/* 
      {data.meter_phase === "elite" ? (
        <ScrollArea className="h-[70vh] overflow-y-scroll mt-10">
          <Table className="w-max">
            <TableCaption>
              A list of all Notarized data device {data?.category.toUpperCase()}{" "}
              - {data?.manufacturer.toUpperCase()}
            </TableCaption>
            <TableHeader className="bg-white">
              <TableRow className="">
                <TableHead className="font-bold">Data ID</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Voltage Phase 1</TableHead>
                <TableHead>Voltage Phase 2</TableHead>
                <TableHead>Voltage Phase 3</TableHead>
                <TableHead>Voltage Phase Avg</TableHead>

                <TableHead>Current Phase 1</TableHead>
                <TableHead>Current Phase 2</TableHead>
                <TableHead>Current Phase 3</TableHead>
                <TableHead>Current Phase Avg</TableHead>

                <TableHead>Power Factor Phase 1</TableHead>
                <TableHead>Power Factor Phase 2</TableHead>
                <TableHead>Power Factor Phase 3</TableHead>
                <TableHead>Power Factor Phase Avg</TableHead>

                <TableHead>Active Power Phase 1</TableHead>
                <TableHead>Active Power Phase 2</TableHead>
                <TableHead>Active Power Phase 3</TableHead>
                <TableHead>Active Power Phase Avg</TableHead>

                <TableHead>Energy Out Phase 1</TableHead>
                <TableHead>Energy Out Phase 2</TableHead>
                <TableHead>Energy Out Phase 3</TableHead>
                <TableHead>Energy Out Phase Avg</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody className=" h-10">
              {data?.data.map((item: NotarizedData) => (
                <TableRow key={item?.id}>
                  <TableCell className="font-bold">{item?.id}</TableCell>
                  <TableCell>
                    {new Date(item?.time.toString()).toLocaleString(undefined, {
                      timeZone: "Asia/Kolkata",
                    })}
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.voltage_phase_1.toString()).toFixed(3)} V
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.voltage_phase_2.toString()).toFixed(3)} V
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.voltage_phase_3.toString()).toFixed(3)} V
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.voltage_phase_avg.toString()).toFixed(3)}{" "}
                    V
                  </TableCell>

                  <TableCell className="text-center">
                    {parseFloat(item?.current_phase_1.toString()).toFixed(3)} A
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.current_phase_2.toString()).toFixed(3)} A
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.current_phase_3.toString()).toFixed(3)} A
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.current_phase_avg.toString()).toFixed(3)}{" "}
                    A
                  </TableCell>

                  <TableCell className="text-center">
                    {parseFloat(item?.power_factor_phase_1.toString()).toFixed(
                      3
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.power_factor_phase_2.toString()).toFixed(
                      3
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.power_factor_phase_3.toString()).toFixed(
                      3
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(
                      item?.power_factor_phase_avg.toString()
                    ).toFixed(3)}
                  </TableCell>

                  <TableCell className="text-center">
                    {parseFloat(item?.active_power_phase_1.toString()).toFixed(
                      3
                    )}{" "}
                    kVh
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.active_power_phase_2.toString()).toFixed(
                      3
                    )}{" "}
                    kVh
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(item?.active_power_phase_3.toString()).toFixed(
                      3
                    )}{" "}
                    kVh
                  </TableCell>
                  <TableCell className="text-center">
                    {parseFloat(
                      item?.active_power_phase_avg.toString()
                    ).toFixed(3)}{" "}
                    kVh
                  </TableCell>

                  <TableCell className="text-center">
                    {item?.apparent_power_phase_1} kWh
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.apparent_power_phase_2} kWh
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.apparent_power_phase_3} kWh
                  </TableCell>
                  <TableCell className="text-center">
                    {item?.apparent_power_phase_avg} kWh
                  </TableCell>

                  <TableCell>
                    <Button
                      onClick={() => verify(item.raw.toString())}
                      className="rounded-lg mr-2"
                    >
                      <Icons.check className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : ( */}
      <Table>
        <TableCaption>
          A list of all Notarized data device
          {/* {data?.category.toUpperCase()} -{" "} */}
          {/* {data?.manufacturer.toUpperCase()} */}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data ID</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Total Energy</TableHead>
            <TableHead>Today</TableHead>
            <TableHead>Power Factor</TableHead>
            <TableHead>Voltage</TableHead>
            <TableHead>Current</TableHead>
            <TableHead>Info</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {notarizedData?.map((item) => (
            <TableRow key={item?.id}>
              <TableCell className="font-medium">{item?.id}</TableCell>
              <TableCell>
                {new Date(item?.time.toString()).toLocaleString(undefined, {
                  timeZone: "Asia/Kolkata",
                })}
              </TableCell>
              <TableCell>
                {parseFloat(item?.totalEnergy).toFixed(3)} kWh
              </TableCell>
              <TableCell>{parseFloat(item?.today).toFixed(3)} kWh</TableCell>
              <TableCell>{item?.power} W</TableCell>
              <TableCell>{item?.voltage} V</TableCell>
              <TableCell>{item?.current} A</TableCell>

              <TableCell>
                <Button
                  // onClick={() => verify(item.raw.toString())}
                  className="rounded-lg mr-2"
                >
                  <Icons.check className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}
