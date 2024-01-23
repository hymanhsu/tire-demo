"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'react-bootstrap';
import CustomPagination from '@/components/CustomPagination';
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { ConfirmDialog } from '@/components/confirmDialog';
import { call_post_as_user } from "@/dao/call";


const ListWorkshopMembers = ({ members, merchant, workshop }) => {
  const Router = useRouter();
  const [apiData, setApiData] = useState(members); // set the api data 
  const [searchFilter, setSearchFilter] = useState(''); // filter the search
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 5; // show row in table  

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

  const handleFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  const filteredData = Array.from(apiData).filter((item) => {
    if (searchFilter == "") {
      return true;
    }
    return item.nick_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.phone_number.toLowerCase().includes(searchFilter.toLowerCase());
  });
  // console.log("filteredData.length = "+filteredData.length);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const removeRecord = (id,role) => {
    const result = Array.from(apiData).filter((item) => !(item.id == id && item.role == role));
    setApiData(result);
  };

  const deleteWorkshopMember = (userId, role) => {
    call_post_as_user("/api/merchant/removeWorkshopMember", { 
      merchant_id: merchant.id,
      workshop_id: workshop.id,
      user_id: userId,
      role: role,
    })
      .then((resp) => {
        if (resp.meta.status == true) {
          removeRecord(userId, role);
          Router.push("/m/workshop/listWorkshopMembers?workshop="+workshop.id);
          //Router.refresh();
        }
      });
  }

  const displayRole = (role) => {
    if (role == "MANR") {
      return "Manager";
    }
    if (role == "STAF") {
      return "General staff";
    }
    return '';
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/workshop/listWorkshops">
          Workshops
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Arrange members
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
      <Container>
        <Row>
          <Col>
            <input
              style={{ width: "200px" }}
              className='form-control mb-2'
              placeholder='Search'
              value={searchFilter}
              onChange={handleFilter}
            />
          </Col>
          <Col></Col>
          <Col>
            <Button variant="primary" onClick={(e) => {
              e.preventDefault();
              Router.push("/m/workshop/addWorkshopMember?workshop=" + workshop.id);
            }}>Arrange</Button>{' '}
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover id='table'>
        <tbody>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Position</th>
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.nick_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>{displayRole(item.role)}</td>
                <td>
                  <Button variant="outline-primary" onClick={(e) => {
                    e.preventDefault();
                    deleteWorkshopMember(item.id, item.role);
                  }}>Remove</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data found</td>
            </tr>
          )}
        </tbody>
      </Table>
      {filteredData.length > 0 &&
        <>
          <CustomPagination
            itemsCount={filteredData.length}
            itemsPerPage={pageSize}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            alwaysShown={false}
          />
        </>
      }
    </div>
  );
};

export default ListWorkshopMembers;