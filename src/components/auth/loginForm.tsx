"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormEvent, useState } from "react";
// import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { call_get, call_post } from "@/dao/call";


export default function LoginForm() {
  // const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });
  const [loading, setLoding] = useState(false);

  const call_login = async (formData: any) => {
    try {
        const res = await fetch(`/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
        const respData = await res.json();
        return respData;
    } catch (error: any) {
        console.log("error in call_post() => ", error);
    }
};

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoding(true);
    const resp = await call_login(formData);
    console.log(resp);
    if (resp.meta.status === true) {
      console.log("------------login-------------");
      setLoding(false);
      localStorage.setItem("token", resp.data.token);
      localStorage.setItem("role", resp.data.session.role_id);
      console.log("------------save token and role-------------");
      const userResp = await call_get("/api/user/userinfo");
      if (userResp.meta.status == true) {
        localStorage.setItem("userinfo", JSON.stringify(userResp.data));
        console.log("------------save userinfo-------------");
        if(resp.data.session.role_id == "CUST"){
          window.location.href = "/";
        }else{
          window.location.href = "/admin/dashboard";
        }
      }
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
      <SubmitButton normalLabel="Login in" pendingLabel="Login in ..." />
    </Form>
  );
}
