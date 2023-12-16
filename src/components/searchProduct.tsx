"use client";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Typography,
} from "@material-tailwind/react";
import SearchProductByVehicle from "./searchProductByVehicle";
import SearchProductByTire from "./searchProductByTire";

export default function SearchProduct() {
  return (
    <Tabs value="search">
      <TabsHeader placeholder={""} defaultValue={"searchByVehicle"}>
        <Tab key="searchByVehicle" value="searchByVehicle" placeholder={""}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3"
            placeholder={""}
          >
            By Vechicle
          </Typography>
        </Tab>
        <Tab key="searchByTireSize" value="searchByTireSize" className="border-solid" placeholder={""}>
          <Typography
            variant="h6"
            color="blue-gray"
            className="-mb-3"
            placeholder={""}
          >
            By Tire Size
          </Typography>
        </Tab>
      </TabsHeader>
      <TabsBody placeholder={""}>
        <TabPanel key="searchByVehicle" value="searchByVehicle">
            <SearchProductByVehicle/>
        </TabPanel>
        <TabPanel key="searchByTireSize" value="searchByTireSize">
            <SearchProductByTire/>
        </TabPanel>
      </TabsBody>
    </Tabs>
  );
}
