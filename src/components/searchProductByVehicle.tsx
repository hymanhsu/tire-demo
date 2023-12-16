"use client";

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState, useEffect, FormEvent } from "react";
import axios from "axios";
import { ItemRec } from "@/dao/car";
import { queryAllBrands } from "@/dao/car_inquiry";
import useSWR from "swr";

export default function SearchProductByVehicle() {
  const [brandList, setBrandList] = useState(queryAllBrands());
  const [yearList, setYearList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [bodyList, setBodyList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({
    brand: -1,
    year: -1,
    model: -1,
    body: "",
  });

  // fetch years
  async function fetchYears(brand: number) {
    await axios({
      method: "get",
      url: `/api/car/year?brand=${brand}`,
      responseType: "json",
    }).then(function (response) {
      setYearList(response.data.result);
    });
  }
  // fetch models
  async function fetchModels(brand: number, year: number) {
    await axios({
      method: "get",
      url: `/api/car/model?brand=${brand}&year=${year}`,
      responseType: "json",
    }).then(function (response) {
      setModelList(response.data.result);
    });
  }
  // fetch bodies
  async function fetchBodies(brand: number, year: number, model: number) {
    await axios({
      method: "get",
      url: `/api/car/body?brand=${brand}&year=${year}&model=${model}`,
      responseType: "json",
    }).then(function (response) {
      setBodyList(response.data.result);
    });
  }

  return (
    <Card color="transparent" shadow={false} placeholder={""} className="w-600">
      <form className="mt-8 mb-2 w-600 max-w-screen-lg ">
        <div className="mb-1 flex flex-col gap-5">
          <Select
            label="Select brand"
            placeholder={""}
            onChange={(value?: string): void => {
              setSelectedOptions({
                brand: Number(value),
                year: -1,
                model: -1,
                body: "",
              });
              // if brand have been selected, then update years,
              // OR clear years
              if (Number(value) !== -1) {
                fetchYears(Number(value));
              } else {
                setYearList([]);
              }
            }}
          >
            {brandList.map((item: ItemRec) => (
              <Option key={item.key} value={String(item.key)}>
                {item.value}
              </Option>
            ))}
          </Select>

          <Select
            label="Select year"
            placeholder={""}
            onChange={(value?: string): void => {
              setSelectedOptions({
                ...selectedOptions,
                year: Number(value),
                model: -1,
                body: "",
              });
              // if brand and year have been selected, then update models,
              // OR clear models
              if (selectedOptions.brand !== -1 && Number(value) !== -1) {
                fetchModels(selectedOptions.brand, Number(value));
              } else {
                setModelList([]);
              }
            }}
          >
            {yearList.map((item: ItemRec) => (
              <Option key={item.key} value={String(item.key)}>
                {item.value}
              </Option>
            ))}
          </Select>

          <Select
            label="Select model"
            placeholder={""}
            onChange={(value?: string): void => {
              setSelectedOptions({
                ...selectedOptions,
                model: Number(value),
                body: "",
              });
              // if brand, year and model have been selected, then update bodies,
              // OR clear bodies
              if (
                selectedOptions.brand !== -1 &&
                selectedOptions.year !== -1 &&
                Number(value) != -1
              ) {
                fetchBodies(
                  selectedOptions.brand,
                  selectedOptions.year,
                  Number(value)
                );
              } else {
                setBodyList([]);
              }
            }}
          >
            {modelList.map((item: ItemRec) => (
              <Option key={item.key} value={String(item.key)}>
                {item.value}
              </Option>
            ))}
          </Select>

          <Select
            label="Select body"
            placeholder={""}
            onChange={(value?: string): void => {
              return setSelectedOptions({
                ...selectedOptions,
                body: value ?? "",
              });
            }}
          >
            {bodyList.map((item: string) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>

          <Button
            className="btn bg-blue-600 text-white px-3 py-2"
            placeholder={""}
          >
            Search
          </Button>
        </div>
      </form>
    </Card>
  );
}
