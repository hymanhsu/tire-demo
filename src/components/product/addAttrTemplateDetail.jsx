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
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';


export default function AddAttrTemplateDetailForm({ templateId, templateType }) {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const Router = useRouter();
  const [formData, setFormData] = useState({
    attr_templ_id: templateId,
    attr_name: "",
    attr_type: "STRING",
    param_name: "",
    title: "",
    description: "",
  });

  const toggleShowAlert = () => setShowAlert(!showAlert);

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/product/addAttrTemplateDetail", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/product/listAttrTemplateDetails?template=" + templateId + "&type=" + templateType);
          Router.refresh();
        } else {
          setAlertMessage(resp.meta.message);
          setShowAlert(true);
        }
      });
  };

  const getSPUAttributes = (templateType) => {
    if (templateType == "SPU") {
      return [
        "attr_short_01", "attr_short_02", "attr_short_03", "attr_short_04", "attr_short_05",
        "attr_short_06", "attr_short_07", "attr_short_08", "attr_short_09", "attr_short_10",
        "attr_short_11", "attr_short_12", "attr_short_13", "attr_short_14", "attr_short_15",
        "attr_short_16", "attr_short_17", "attr_short_18", "attr_short_19", "attr_short_20",
        "attr_medium_01", "attr_medium_02", "attr_medium_03", "attr_medium_04", "attr_medium_05",
        "attr_medium_06", "attr_medium_07", "attr_medium_08", "attr_medium_09", "attr_medium_10",
        "attr_long_01", "attr_long_02", "attr_long_03", "attr_long_04", "attr_long_05",
      ];
    }
    if (templateType == "SKU") {
      return [
        "attr_short_01", "attr_short_02", "attr_short_03", "attr_short_04", "attr_short_05",
        "attr_short_06", "attr_short_07", "attr_short_08", "attr_short_09", "attr_short_10",
        "attr_medium_01", "attr_medium_02", "attr_medium_03", "attr_medium_04", "attr_medium_05",
        "attr_long_01", "attr_long_02", "attr_long_03",
      ];
    }
    return [];
  }

  const attributeNames = getSPUAttributes(templateType);

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listAttrTemplates">
          Attribute Templates
        </Breadcrumb.Item>
        <Breadcrumb.Item href={"/m/product/listAttrTemplateDetails?template=" + templateId + "&type=" + templateType}>
          Defines
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>

      <Card bg='warning' text='light' className="mb-2">
        <Card.Header as="h5">Pay attention to the length of attribute</Card.Header>
        <Card.Body>
          <Card.Text>
          Each attribute represents a different length. 
          You need to pay attention to defining the attributes to the appropriate parameters.
          </Card.Text>
          <Card.Text>
          attr_short_xx : its length is 30 chars
          </Card.Text>
          <Card.Text>
          attr_medium_xx : its length is 100 chars
          </Card.Text>
          <Card.Text>
          attr_long_xx : its length is 500 chars
          </Card.Text>
        </Card.Body>
      </Card>
      <br></br>
      
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="targetForm.attr_name">
          <Form.Label column sm="2">
            Attribute Name
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select attribute" value={formData.attr_name}
              onChange={(e) => {
                setFormData({ ...formData, attr_name: e.target.value });
              }}
            >
              <option key="" value="">-----select attribute------</option>
              {
                attributeNames.map((item, i) => (
                  <option key={item} value={item}>{item}</option>
                ))
              }
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.attr_type">
          <Form.Label column sm="2">
            Type
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select type" value={formData.attr_type}
              onChange={(e) => {
                setFormData({ ...formData, attr_type: e.target.value });
              }}
            >
              <option value="STRING">STRING</option>
              <option value="NUMBER">NUMBER</option>
              <option value="IMAGES">IMAGES</option>
              <option value="VIDEO">VIDEO</option>
              {/* <option value="RICHTEXT">RICHTEXT</option> */}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.param_name">
          <Form.Label column sm="2">
            Parameter
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Parameter"
              onChange={(e) => {
                setFormData({ ...formData, param_name: e.target.value });
              }}
              value={formData.param_name}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.title">
          <Form.Label column sm="2">
            Title
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="01.Title"
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
            />
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

        <Toast bg={"warning"} show={showAlert} onClose={toggleShowAlert}>
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>{alertMessage}</Toast.Body>
        </Toast>

      </Form>
    </div>
  );
}
