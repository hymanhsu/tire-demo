"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { call_post } from "@/dao/call";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SelectPos from "../selectPos";


export default function AddWorkshopForm({merchantId}:{merchantId:string}) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchantId,
    workshop_sn: "",
    workshop_name: "",
    introduction: "",
    address: "",
    phone_number: "",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await call_post("/api/merchant/addWorkshop", formData);
    console.log(data);
    if (data.meta.status == true) {
      console.log("------------ok-------------");
      Router.push("/admin/merchant/listWorkshops?merchant="+merchantId);
    } 
  };

  const handleSelect = async (x:number, y:number) => {
    console.log(`x=${x} , y=${y}`);
    setFormData({ 
      ...formData, 
      latitude : x.toString(),
      longitude : y.toString(),
    });
  }

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/admin/merchant/listMerchants">
          Merchants
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add Workshop</Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="targetForm.sn">
          <Form.Label column sm="2">
            SN
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="SN"
              onChange={(e) => {
                setFormData({ ...formData, workshop_sn: e.target.value });
              }}
              value={formData.workshop_sn}
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
                setFormData({ ...formData, workshop_name: e.target.value });
              }}
              value={formData.workshop_name}
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
          className="mb-3"
          controlId="targetForm.position"
        >
          <Form.Label column sm="2">
            Position
          </Form.Label>
          <Col sm="10">
            latitude = {formData.latitude},  longitude = {formData.longitude}
          </Col>
          <SelectPos setPosition={handleSelect} />
          
        </Form.Group>


        {/* <Button variant="primary" type="submit">
        Sign up
      </Button> */}
        <SubmitButton normalLabel="Add" pendingLabel="Add ..." />
      </Form>
    </div>
  );
}
