"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEvent, useState } from "react";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";

const temp: any = {};

export default function LoginAsUserForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [respData, setRespData] = useState(temp);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(`/m/api/auth/loginAsUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((resp: any) => {
        console.log(resp);
        if (resp.meta.status == true) {
          if (resp.data.role_options == undefined) {
            console.log("------------login as user-------------");
            Router.push("/admin/");
            Router.refresh();
          } else {
            console.log("------------show role options-------------");
            // get roles options for user to choose
            setRespData(resp.data);
            setShow(true);
          }
        }
      });
  };

  const handleChoose = (index: number) => {
    setShow(false);
    fetch(`/m/api/auth/loginProceedAsUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...respData,
        selected: index,
      }),
    })
      .then((response) => response.json())
      .then((resp: any) => {
        console.log(resp);
        if (resp.meta.status == true) {
          console.log(
            "------------after choose role, login as user-------------"
          );
          Router.push("/admin/");
          Router.refresh();
        }
      });
  };

  return (
    <>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Choose your role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have multiple roles in our platform, and act as only single role
          every time.
        </Modal.Body>
        <Modal.Footer>
          {respData.role_options != undefined &&
            respData.role_options.map((item: any, index: number) => (
              <Button
                key={index}
                variant="secondary"
                size="lg"
                onClick={() => {
                  handleChoose(index);
                }}
              >
                {item.merchant_name} - {item.workshop_id} - {item.role}
              </Button>
            ))}
        </Modal.Footer>
      </Modal>
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
    </>
  );
}
