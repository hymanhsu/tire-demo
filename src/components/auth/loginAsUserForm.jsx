"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FormEvent, useState } from "react";
import { SubmitButton } from "../submitButton";
import { useRouter } from "next/navigation";
import { AlertMessage } from "@/components/alertMessage";


export default function LoginAsUserForm() {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    login_name: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [respData, setRespData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`/m/api/auth/loginAsUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((resp) => {
        console.log(resp);
        if (resp.meta.status == true) {
          if (resp.data.role_options == undefined) {
            console.log("------------login as user-------------");
            Router.push("/m/");
            Router.refresh();
          } else {
            console.log("------------show role options-------------");
            // get roles options for user to choose
            setRespData(resp.data);
            setShow(true);
          }
        } else {
          setShowAlert(true);
        }
      });
  };

  const handleChoose = (index) => {
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
      .then((resp) => {
        console.log(resp);
        if (resp.meta.status == true) {
          console.log(
            "------------after choose role, login as user-------------"
          );
          Router.push("/m/");
          Router.refresh();
        }
      });
  };

  const handleClose = () => setShow(false);

  const displayRoleOption = (item, index) => {
    if(item.role == 'MERT'){
      return (
        <Button
        key={index}
        variant="warning"
        onClick={() => {
          handleChoose(index);
        }}
      >
        {item.merchant_name} - Merchant Owner
      </Button>
      );
    }
    if(item.role == 'MANR'){
      return (
        <Button
        key={index}
        variant="success"
        onClick={() => {
          handleChoose(index);
        }}
      >
        {item.merchant_name} - {item.workshop_name} - Manager
      </Button>
      );
    }
    if(item.role == 'STAF'){
      return (
        <Button
        key={index}
        variant="primary"
        onClick={() => {
          handleChoose(index);
        }}
      >
        {item.merchant_name} - {item.workshop_name} - Staff
      </Button>
      );
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Choose your role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have multiple roles in our platform, and act as only single role
          every time.
        </Modal.Body>
        <Modal.Footer>
          {respData.role_options != undefined &&
            respData.role_options.map((item, index) => displayRoleOption(item, index))}
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
        <AlertMessage title='Login failed'
          content='Please check your username/password or contact your administrator!'
          show={showAlert}
          handleClose={() => setShowAlert(false)} />
        <SubmitButton normalLabel="Log in" pendingLabel="Log in ..." />
      </Form>
    </>
  );
}
