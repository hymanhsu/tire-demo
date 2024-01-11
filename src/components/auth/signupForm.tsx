"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submitButton";
import { call_post } from "@/dao/call";


export default function SignupForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoding(true);
    const data = await call_post("/api/auth/signup",formData);
    console.log(data);
    if (data.meta.status === true) {
      console.log("------------ok-------------");
      setLoding(false);
      Router.push("/auth/login");
    } else {
      setLoding(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="signupForm.loginname">
        <Form.Label>Login Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="your login name"
          onChange={(e) => {
            setFormData({ ...formData, login_name: e.target.value });
          }}
          value={formData.login_name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupForm.phonenumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="your phone number"
          onChange={(e) => {
            setFormData({ ...formData, phone_number: e.target.value });
          }}
          value={formData.phone_number}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupForm.email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="name@example.com"
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
          }}
          value={formData.email}
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
        Sign up
      </Button> */}
      <SubmitButton normalLabel="Sign up" pendingLabel="Sign up ..." />
    </Form>
  );
}
