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
import Card from 'react-bootstrap/Card';
import SelectPos from "../selectPos";


export default function AddWorkshopForm({ merchant }) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchant.id,
    workshop_sn: "",
    workshop_name: "",
    introduction: "",
    phone_number: "",
    address: "ABC",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    call_post_as_user("/api/merchant/addWorkshop", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/workshop/listWorkshops");
        }
      }
      );
  };

  const handleSelectPosition = async (addr, lat, lng) => {
    console.log(`handleSelectPosition : addr=${addr}, lat=${lat} , lng=${lng}`);
    setFormData({
      ...formData,
      address: addr,
      latitude: lat.toString(),
      longitude: lng.toString(),
    });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/workshop/listWorkshops">
          Workshops
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add Workshop</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '36rem' }}>
        <Card.Body>
          <Card.Title>Name : {merchant.merchant_name}, SN = {merchant.merchant_sn}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">In {merchant.city}, {merchant.province}, {merchant.nation} </Card.Subtitle>
          <Card.Text>
            {merchant.address}{' '}
            {merchant.introduction}
          </Card.Text>
          <Card.Link href={
            merchant.website_url == "" ? "#" : merchant.website_url
          }>Website</Card.Link>
        </Card.Body>
      </Card>
      <hr></hr>
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
                e.preventDefault();
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
                e.preventDefault();
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
                e.preventDefault();
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
                e.preventDefault();
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
              value={`${formData.address}`}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.position">
          <Form.Label column sm="2">
            Position
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="label"
              value={`latitude = ${formData.latitude}, longitude = ${formData.longitude}`}
              readOnly
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="targetForm.position">
          <Form.Label column sm="2">
          </Form.Label>
          <Col sm="10">
            <SelectPos setPosition={handleSelectPosition} />
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
