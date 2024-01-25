"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { call_post_as_user } from "@/dao/call";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";

export default function AddBrandForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    brand: "",
    grade: 1,
    holder: "",
    introduction: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/brand/addBrand", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/product/listBrands");
          Router.refresh();
        }
      });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listBrands">
          Brands
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="targetForm.brand">
          <Form.Label column sm="2">
            Brand
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Brand name"
              onChange={(e) => {
                setFormData({ ...formData, brand: e.target.value });
              }}
              value={formData.brand}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.grade">
          <Form.Label column sm="2">
            Grade
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select grade" value={formData.grade}
              onChange={(e) => {
                setFormData({ ...formData, grade: Number(e.target.value) });
              }}
            >
              <option value="1">Premium</option>
              <option value="2">Mid-range</option>
              <option value="3">Economy</option>
              <option value="4">Budget</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.holder">
          <Form.Label column sm="2">
          Holder
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Holder name"
              onChange={(e) => {
                setFormData({ ...formData, holder: e.target.value });
              }}
              value={formData.holder}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.introduction">
          <Form.Label column sm="2">
          Introduction
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea" rows={3}
              placeholder="Introduction"
              onChange={(e) => {
                setFormData({ ...formData, introduction: e.target.value });
              }}
              value={formData.introduction}
            />
          </Col>
        </Form.Group>

        {/* <Button variant="primary" type="submit">
        Sign up
      </Button> */}
        <SubmitButton normalLabel="Add" pendingLabel="Add ..." />
      </Form>
    </div>
  );
}
