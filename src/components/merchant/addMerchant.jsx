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

export default function AddMerchantForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    nation: "",
    province: "",
    city: "",
    merchant_sn: "",
    merchant_name: "",
    introduction: "",
    website_url: "",
    address: "",
    phone_number: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/merchant/add", formData)
    .then((resp) => {
      if (resp.meta.status == true) {
        Router.push("/m/merchant/listMerchants");
        Router.refresh();
      }
    });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/merchant/listMerchants">
          Merchants
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="targetForm.nation">
          <Form.Label column sm="2">
            Nation
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Nation name"
              onChange={(e) => {
                setFormData({ ...formData, nation: e.target.value });
              }}
              value={formData.nation}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.province">
          <Form.Label column sm="2">
            Province
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Province name"
              onChange={(e) => {
                setFormData({ ...formData, province: e.target.value });
              }}
              value={formData.province}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.city">
          <Form.Label column sm="2">
            City
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="City name"
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
              }}
              value={formData.city}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.sn">
          <Form.Label column sm="2">
            SN
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="SN"
              onChange={(e) => {
                setFormData({ ...formData, merchant_sn: e.target.value });
              }}
              value={formData.merchant_sn}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.name">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setFormData({ ...formData, merchant_name: e.target.value });
              }}
              value={formData.merchant_name}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="targetForm.introduction"
        >
          <Form.Label column sm="2">
            Introduction
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Introduction"
              onChange={(e) => {
                setFormData({ ...formData, introduction: e.target.value });
              }}
              value={formData.introduction}
              as="textarea"
              rows={3}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="targetForm.website_url"
        >
          <Form.Label column sm="2">
            Website
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Website url"
              onChange={(e) => {
                setFormData({ ...formData, website_url: e.target.value });
              }}
              value={formData.website_url}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.address">
          <Form.Label column sm="2">
            Address
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Address"
              onChange={(e) => {
                setFormData({ ...formData, address: e.target.value });
              }}
              value={formData.address}
            />
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="targetForm.phone_number"
        >
          <Form.Label column sm="2">
            Phone number
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Phone number"
              onChange={(e) => {
                setFormData({ ...formData, phone_number: e.target.value });
              }}
              value={formData.phone_number}
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
