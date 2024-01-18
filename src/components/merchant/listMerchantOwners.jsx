"use client";

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomPagination from '@/components/CustomPagination';
import { useRouter } from "next/navigation";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from 'react-bootstrap/Button';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import {ConfirmDialog} from '@/components/confirmDialog';
import { call_post_as_user } from "@/dao/call";


const ListMerchantOwners = ({ owners, merchant }) => {
  const [show, setShow] = useState(false);
  const [userId, setUserId] = useState("");
  const Router = useRouter();
  const [apiData, setApiData] = useState(owners); // set the api data 
  const [searchFilter, setSearchFilter] = useState(''); // filter the search
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 3; // show row in table

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
      item.phone_number.toLowerCase().includes(searchFilter.toLowerCase());
  });
  // console.log("filteredData.length = " + filteredData.length);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const removeRecord = (id) => {
    const result = Array.from(apiData).filter((item) => item.id != id);
    setApiData(result);
  }; 

  const handleShow = (userId) => {
    setUserId(userId);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleSure = () => {
    setShow(false);
    // console.log("delete "+userId);
    deleteMerchantOwner(userId);
  };  
  const deleteMerchantOwner = (userId) => {
    call_post_as_user("/api/user/deleteUser", {id:userId})
    .then((resp) => {
      if (resp.meta.status == true) {
        removeRecord(userId);
        Router.push("/m/merchant/listMerchantOwners?merchant="+merchant.id);
        //Router.refresh();
      }
    });
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/merchant/listMerchants">
          Merchants
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Owners</Breadcrumb.Item>
      </Breadcrumb>
      <Card style={{ width: '36rem' }}>
        <Card.Body>
          <Card.Title>Name : {merchant.merchant_name}, SN = {merchant.merchant_sn}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">At {merchant.city}, {merchant.province}, {merchant.nation} </Card.Subtitle>
          <Card.Text>
            {merchant.address}{' '}
            {merchant.introduction}
          </Card.Text>
          <Card.Link href={
            merchant.website_url == "" ? "#": merchant.website_url
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
              Router.push("/m/merchant/addMerchantOwner?merchant="+merchant.id);
            }}>Add</Button>{' '}
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
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.nick_name}</td>
                <td>{item.phone_number}</td>
                <td>{item.email}</td>
                <td>
                <Button variant="outline-primary" onClick={(e)=>{
                  e.preventDefault();
                  handleShow(item.id);
                }}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
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
      <ConfirmDialog 
        title={'Confirmation for deletion'} 
        content={'Unable to recover data after deletion! Are you sure to delete data?'} 
        show={show} 
        handleClose={handleClose} 
        handleSure={handleSure}/>
    </div>
  );
};

export default ListMerchantOwners;