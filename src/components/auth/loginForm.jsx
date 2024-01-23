"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";
import { AlertMessage } from "@/components/alertMessage";


export default function LoginForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/w/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then((resp) => {
      if (resp.meta.status === true) {
        console.log("------------login as cust-------------");
        Router.push("/w/");
        Router.refresh();
      }else{
        setShowAlert(true);
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
      <AlertMessage title='Login failed'
          content='Please check your username/password or contact your administrator!'
          show={showAlert}
          handleClose={() => setShowAlert(false)} />
      <SubmitButton normalLabel="Log in" pendingLabel="Log in ..." />
    </Form>
  );
}
