"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "./submitButton";

const call_signup = async (formData: any) => {
  try {
    const res = await fetch(`/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error in signup (service) => ", error);
  }
};

export default function SignupForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    loginName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoding(true);
    const data = await call_signup(formData);
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
            setFormData({ ...formData, loginName: e.target.value });
          }}
          value={formData.loginName}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="signupForm.phonenumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="your phone number"
          onChange={(e) => {
            setFormData({ ...formData, phoneNumber: e.target.value });
          }}
          value={formData.phoneNumber}
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
