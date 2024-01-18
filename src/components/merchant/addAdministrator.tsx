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

export default function AddAdministratorForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    nick_name: "",
    phone_number: "",
    email: "",
    login_name: "",
    password: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    call_post_as_user("/api/user/addAdministrator", formData)
    .then((resp: any) => {
      if (resp.meta.status == true) {
        Router.push("/m/merchant/listAdministrators");
        Router.refresh();
      }
    });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/merchant/listAdministrators">
          Administrators
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
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
