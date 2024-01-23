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

export default function AddWorkshopMemberForm({ merchant, workshop, members }) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchant.id,
    workshop_id: workshop.id,
    role: "STAF",
    user_id: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formData);
    if(formData.user_id == ""){
      return;
    }
    call_post_as_user("/api/merchant/addWorkshopMember", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/workshop/listWorkshopMembers?workshop=" + workshop.id);
          Router.refresh();
        }
      });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/workshop/listWorkshops">
          Workshops
        </Breadcrumb.Item>
        <Breadcrumb.Item href={"/m/workshop/listWorkshopMembers?workshop=" + workshop.id}>
          Arrange members
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Arrange
        </Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '50rem' }}>
        <Card.Body>
          <Card.Title>Merchant name : {merchant.merchant_name}, SN = {merchant.merchant_sn}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">In {merchant.city}, {merchant.province}, {merchant.nation} </Card.Subtitle>
          <Card.Title>Workshop name : {workshop.workshop_name}, SN = {workshop.workshop_sn}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{workshop.latitude}{' , '}{workshop.longitude}</Card.Subtitle>
          <Card.Text>
            Address : {workshop.address}
            <br />
            Phone : {workshop.phone_number}
          </Card.Text>
          <Card.Link href={
            merchant.website_url == "" ? "#" : merchant.website_url
          }>Website</Card.Link>
        </Card.Body>
      </Card>
      <hr></hr>

      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.member">
          <Form.Label column sm="2">
            Member
          </Form.Label>
          <Col sm="10">
            <Form.Select
              value={formData.user_id}
              onChange={(e) => {
                e.preventDefault();
                // console.log(e.target.value);
                setFormData({
                  ...formData,
                  user_id: e.target.value
                });
              }}>
                <option key={''} value={''} >{'--please select--'}</option>
              {
                members.map((item, i) => (
                  <option key={item.id} value={item.id} >{item.nick_name}</option>
                ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.role">
          <Form.Label column sm="2">
            Position
          </Form.Label>
          <Col sm="10">
            <Form.Select
              value={formData.role}
              onChange={(e) => {
                e.preventDefault();
                // console.log(e.target.value);
                setFormData({
                  ...formData,
                  role: e.target.value
                });
              }}>
              <option key={'MANR'} value={'MANR'} >{'Manager'}</option>
              <option key={'STAF'} value={'STAF'} >{'General staff'}</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* <Button variant="primary" type="submit">
        Sign up
      </Button> */}
        <SubmitButton normalLabel="Arrange" pendingLabel="Arrange ..." />
      </Form>
    </div>
  );
}
