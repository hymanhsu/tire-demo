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

export default function AddAttrTemplateForm({merchantId}) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchantId,
    template_name: "",
    template_type: "SPU",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/product/addAttrTemplate", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/product/listAttrTemplates");
          Router.refresh();
        }
      });
  };

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listAttrTemplates">
        Attribute Templates
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="targetForm.brand">
          <Form.Label column sm="2">
            Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Template name"
              onChange={(e) => {
                setFormData({ ...formData, template_name: e.target.value });
              }}
              value={formData.template_name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.grade">
          <Form.Label column sm="2">
            Type
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select type" value={formData.template_type}
              onChange={(e) => {
                setFormData({ ...formData, template_type: e.target.value });
              }}
            >
              <option value="SPU">SPU</option>
              <option value="SKU">SKU</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.description">
          <Form.Label column sm="2">
          Description
          </Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea" rows={3}
              placeholder="Description"
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
              }}
              value={formData.description}
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
