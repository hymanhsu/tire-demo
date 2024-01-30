"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { call_post_as_user } from "@/dao/call";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CornerDownRight } from 'react-feather';



export default function AddProductForm({ merchantId, categories, brands, templates }) {
  const Router = useRouter();
  const [formData, setFormData] = useState({
    merchant_id: merchantId,
    spu_name: "",
    category_id: "",
    brand_id: "",
    attr_templ_id: "",
    title: "",
    description: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/product/addProduct", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/product/listProducts");
          Router.refresh();
        }
      });
  };

  const renderNode = (level, node, index) => {
    return (
      <React.Fragment key={index}>
          {level == 1 && 
          <option value={node.id} >{node.label}</option>
          }
          {level == 2 && 
          <option value={node.id} >{'\u00A0\u00A0'}{'\u21b3'}{node.label}</option>
          }
          {level == 3 && 
          <option value={node.id} >{'\u00A0\u00A0\u00A0\u00A0'}{'\u21b3'}{node.label}</option>
          }
        {node.nodes != undefined && (
          node.nodes.map((node, i) => renderNode(level + 1, node, i))
        )}
      </React.Fragment>
    );
  }

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listProducts">
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Add</Breadcrumb.Item>
      </Breadcrumb>
      <Form onSubmit={handleSubmit}>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.spu_name">
          <Form.Label column sm="2">
            SPU Name
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="SPU name"
              onChange={(e) => {
                setFormData({ ...formData, spu_name: e.target.value });
              }}
              value={formData.spu_name}
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
              placeholder="Title"
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
              }}
              value={formData.title}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.category">
          <Form.Label column sm="2">
            Category
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select type" value={formData.category_id}
              onChange={(e) => {
                setFormData({ ...formData, category_id: e.target.value });
              }}
            >
              <option value="">---------select category-----------</option>
              {
                categories.map((node, i) => renderNode(1, node, i))
              }
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.brand">
          <Form.Label column sm="2">
            Brand
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select type" value={formData.brand_id}
              onChange={(e) => {
                setFormData({ ...formData, brand_id: e.target.value });
              }}
            >
              <option value="">---------select brand-----------</option>
              {
                brands.map((node, i) => (
                  <option key={node.id} value={node.id}>
                    {node.brand}
                  </option>
                ))
              }
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="targetForm.template">
          <Form.Label column sm="2">
            Template
          </Form.Label>
          <Col sm="10">
            <Form.Select aria-label="Select type" value={formData.attr_templ_id}
              onChange={(e) => {
                setFormData({ ...formData, attr_templ_id: e.target.value });
              }}
            >
              <option value="">---------select template-----------</option>
              {
                templates.map((node, i) => (
                  <option key={node.id} value={node.id}>
                    {node.template_name}
                  </option>
                ))
              }
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
