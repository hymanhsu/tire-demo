"use client";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "../submitButton";
import { call_post_as_user } from "@/dao/call";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { CornerDownRight } from 'react-feather';


const extractAttrsData = (productId, attrs) => {
  let data = {};
  data.product_id = productId;
  for (let i = 0; i < attrs.length; i++) {
    const attr = attrs[i];
    data[attr.attr_name] = attr.attr_value;
  }
  return data;
}

export default function EditProductAttrForm({ productId, attrs }) {
  const Router = useRouter();
  const [formData, setFormData] = useState(extractAttrsData(productId, attrs));

  const handleSubmit = (event) => {
    event.preventDefault();
    call_post_as_user("/api/product/updateProductAttrs", formData)
      .then((resp) => {
        if (resp.meta.status == true) {
          Router.push("/m/product/listProducts");
          Router.refresh();
        }
      });
  };

  // useEffect(() => {
  //   console.log(formData);
  //   console.log(attrs);
  // });

  return (
    <div className="fluid container">
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listProducts">
          Products
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Set Attributes</Breadcrumb.Item>
      </Breadcrumb>

      <Form onSubmit={handleSubmit}>

        {
          attrs.map((item, index) => (
            <React.Fragment key={index}>
              {
                (item.attr_type == "STRING" || item.attr_type == "NUMBER") && (
                  <Form.Group as={Row} className="mb-3" controlId={"targetForm." + item.attr_name}>
                    <Form.Label column sm="2">
                      {item.title}
                    </Form.Label>
                    <Col sm="10">
                      <Form.Control
                        as="textarea" rows={2}
                        placeholder={item.description}
                        onChange={(e) => {
                          const newData = { ...formData };
                          newData[item.attr_name] = e.target.value;
                          setFormData(newData);
                        }}
                        value={formData[item.attr_name]}
                      />
                    </Col>
                  </Form.Group>
                )
              }
            </React.Fragment>
          ))
        }

        <SubmitButton normalLabel="Save" pendingLabel="Save ..." />
      </Form>
    </div>
  );
}
