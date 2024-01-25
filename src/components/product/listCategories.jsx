"use client";

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useRouter } from "next/navigation";
import CustomPagination from '@/components/CustomPagination';
import { call_post_as_user } from "@/dao/call";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import { ConfirmDialog } from '@/components/confirmDialog';
import {CategoryTreeView}  from '@/components/product/categoryTreeView'


const ListCategories = ({ categories }) => {

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Categories</Breadcrumb.Item>
      </Breadcrumb>
      <Container>
        <Row>
          <Col>
          <CategoryTreeView data={categories} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListCategories;