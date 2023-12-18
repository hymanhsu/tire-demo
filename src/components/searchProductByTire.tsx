"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function SearchProductByTire() {
  return (
    <Form>
      <Form.Select aria-label="Width">
        <option>Choose width</option>
        <option value="1">165</option>
        <option value="2">155</option>
        <option value="3">175</option>
      </Form.Select>
      <br />

      <Form.Select aria-label="Ratio">
        <option>Choose ratio</option>
        <option value="1">60</option>
        <option value="2">65</option>
      </Form.Select>
      <br />

      <Form.Select aria-label="Diameter">
        <option>Choose diameter</option>
        <option value="1">15</option>
        <option value="2">14</option>
      </Form.Select>
      <br />

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  );
}
