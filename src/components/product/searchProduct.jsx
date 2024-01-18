"use client";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SearchProductByVehicle from "./searchProductByVehicle";
import SearchProductByTire from "./searchProductByTire";

export default function SearchProduct() {
  return (
    <Tabs
      defaultActiveKey="searchByVehicle"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="searchByVehicle" title="By Vechicle">
        <SearchProductByVehicle />
      </Tab>
      <Tab eventKey="searchByTireSize" title="By Tire Size">
        <SearchProductByTire />
      </Tab>
    </Tabs>
  );
}
