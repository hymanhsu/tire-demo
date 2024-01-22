"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`/w/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then((resp: any) => {
      if (resp.meta.status === true) {
        console.log("------------login as cust-------------");
        Router.push("/w/");
        Router.refresh();
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="signupForm.loginname">
        <Form.Label>Login Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="name/email/phone"
          onChange={(e) => {
            setFormData({ ...formData, login_name: e.target.value });
          }}
          value={formData.login_name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setFormData({ ...formData, password: e.target.value });
          }}
          value={formData.password}
        />
      </Form.Group>
      {/* <Button variant="primary" type="submit">
        Login in
      </Button> */}
      <SubmitButton normalLabel="Log in" pendingLabel="Log in ..." />
    </Form>
  );
}
