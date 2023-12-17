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

export default function SearchProductByTire() {
  return (
    <Card color="transparent" shadow={false} placeholder={""} className="w-600">
      <form className="mt-8 mb-2 w-600 max-w-screen-lg ">
        <div className="mb-1 flex flex-col gap-5">



      <Select label="Select Version" placeholder={""}>
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
        <Option>Material Tailwind Svelte</Option>
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
