"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import { ItemRec } from "@/dao/car";
import { queryAllBrands } from "@/dao/car_inquiry";
// import useSWR from "swr";

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
  function fetchYears(brand) {
    axios({
      method: "get",
      url: `/api/car/year?brand=${brand}`,
      responseType: "json",
    }).then(function (response) {
      setYearList(response.data.result);
    });
  }
  // fetch models
  function fetchModels(brand, year) {
    axios({
      method: "get",
      url: `/api/car/model?brand=${brand}&year=${year}`,
      responseType: "json",
    }).then(function (response) {
      setModelList(response.data.result);
    });
  }
  // fetch bodies
  function fetchBodies(brand, year, model) {
    axios({
      method: "get",
      url: `/api/car/body?brand=${brand}&year=${year}&model=${model}`,
      responseType: "json",
    }).then(function (response) {
      setBodyList(response.data.result);
    });
  }

  return (
    <Form>

      <Form.Select
        aria-label="Select brand"
        name="brand"
        onChange={(event) => {
          const newValue = event.currentTarget.value;
          setSelectedOptions({
            brand: Number(newValue),
            year: -1,
            model: -1,
            body: "",
          });
          // if brand have been selected, then update years,
          // OR clear years
          if (Number(newValue) !== -1) {
            fetchYears(Number(newValue));
          } else {
            setYearList([]);
          }
        }}
      >
        <option key={-1} value={-1}>
          Select brand
        </option>
        {brandList.map((item) => (
          <option key={String(item.key)} value={String(item.key)}>
            {item.value}
          </option>
        ))}
      </Form.Select>
      <br />

      <Form.Select
        aria-label="Select year"
        name="year"
        onChange={(event) => {
          const newValue = event.currentTarget.value;
          setSelectedOptions({
            ...selectedOptions,
            year: Number(newValue),
            model: -1,
            body: "",
          });
          // if brand and year have been selected, then update models,
          // OR clear models
          if (selectedOptions.brand !== -1 && Number(newValue) !== -1) {
            fetchModels(selectedOptions.brand, Number(newValue));
          } else {
            setModelList([]);
          }
        }}
      >
        <option key={-1} value={-1}>
          Select year
        </option>
        {yearList.map((item) => (
          <option key={String(item.key)} value={String(item.key)}>
            {item.value}
          </option>
        ))}
      </Form.Select>
      <br />

      <Form.Select
        aria-label="Select model"
        name="model"
        onChange={(event) => {
          const newValue = event.currentTarget.value;
          setSelectedOptions({
            ...selectedOptions,
            model: Number(newValue),
            body: "",
          });
          // if brand, year and model have been selected, then update bodies,
          // OR clear bodies
          if (
            selectedOptions.brand !== -1 &&
            selectedOptions.year !== -1 &&
            Number(newValue) != -1
          ) {
            fetchBodies(
              selectedOptions.brand,
              selectedOptions.year,
              Number(newValue)
            );
          } else {
            setBodyList([]);
          }
        }}
      >
        <option key={-1} value={-1}>
          Select model
        </option>
        {modelList.map((item) => (
          <option key={String(item.key)} value={String(item.key)}>
            {item.value}
          </option>
        ))}
      </Form.Select>
      <br />

      <Form.Select
        aria-label="Select body"
        name="body"
        onChange={(event) => {
          const newValue = event.currentTarget.value;
          setSelectedOptions({
            ...selectedOptions,
            body: newValue,
          });
        }}
      >
        <option key={-1} value={-1}>
          Select model
        </option>
        {bodyList.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </Form.Select>
      <br />

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}
