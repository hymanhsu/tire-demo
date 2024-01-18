"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {TypeSize, allWidths, allRatios, allDiameters, 
    getMostCommonlyWidth, getMostCommonlyRatio, getMostCommonlyDiameter} from "@/dao/tyre"
import { FormEvent, useState } from "react";

export default function SearchProductByTire() {
  const [selectedOptions, setSelectedOptions] = useState({
    width : getMostCommonlyWidth(),
    ratio : getMostCommonlyRatio(),
    diameter : getMostCommonlyDiameter(),
  });
  return (
    <Form>
      <Form.Select aria-label="Width" value={selectedOptions.width} 
        onChange={(event: FormEvent<HTMLSelectElement>):void => {
          setSelectedOptions({
            ...selectedOptions,
            width : Number(event.currentTarget.value),
          });
      }}>
        <option key={-1} value={-1}>Choose width</option>
        {allWidths.map((item:TypeSize) => (
          <option key={item.key} value={item.key}>{item.key}</option>
        ))}
      </Form.Select>
      <br />

      <Form.Select aria-label="Ratio" value={selectedOptions.ratio} 
        onChange={(event: FormEvent<HTMLSelectElement>):void => {
          setSelectedOptions({
            ...selectedOptions,
            ratio : Number(event.currentTarget.value),
          });
      }}>
        <option key={-1} value={-1}>Choose ratio</option>
        {allRatios.map((item:TypeSize) => (
          <option key={item.key} value={item.key}>{item.key}</option>
        ))}
      </Form.Select>
      <br />

      <Form.Select aria-label="Diameter" value={selectedOptions.diameter}
        onChange={(event: FormEvent<HTMLSelectElement>):void => {
          setSelectedOptions({
            ...selectedOptions,
            diameter : Number(event.currentTarget.value),
          });
      }}>
        <option key={-1} value={-1}>Choose diameter</option>
        {allDiameters.map((item:TypeSize) => (
          <option key={item.key} value={item.key}>{item.key}</option>
        ))}
      </Form.Select>
      <br />

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}
