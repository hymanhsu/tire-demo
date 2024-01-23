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

export default function AddWorkshopMemberForm({merchant}) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchant.id,
    nick_name: "",
    phone_number: "",
    email: "",
    login_name: "",
    password: ""
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/user/addWorkshopStaff", formData)
    .then((resp) => {
      if (resp.meta.status == true) {
        Router.push("/m/workshop/listWorkshopMembers");
        Router.refresh();
      }
    });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/workshop/listWorkshopMembers">
        Employees
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '36rem' }}>
        <Card.Body>
          <Card.Title>Name : {merchant.merchant_name}, SN = {merchant.merchant_sn}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">At {merchant.city}, {merchant.province}, {merchant.nation} </Card.Subtitle>
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
        <Form.Group as={Row} className="mb-3" controlId="targetForm.nation">
          <Form.Label column sm="2">
            Nick Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Nick name"
              onChange={(e) => {
                setFormData({ ...formData, nick_name: e.target.value });
              }}
              value={formData.nick_name}
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

        <Form.Group as={Row} className="mb-3" controlId="targetForm.email">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              value={formData.email}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.login_name">
          <Form.Label column sm="2">
            Login name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Login name"
              onChange={(e) => {
                setFormData({ ...formData, login_name: e.target.value });
              }}
              value={formData.login_name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.password">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              value={formData.password}
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
