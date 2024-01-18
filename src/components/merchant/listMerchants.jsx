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
import {ConfirmDialog} from '@/components/confirmDialog';


const ListMerchants = ({merchants}) => {
  const [show, setShow] = useState(false);
  const [merchantId, setMerchantId] = useState("");  
  const Router = useRouter();
  const [apiData, setApiData] = useState(merchants); // set the api data 
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
    return item.nation.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.province.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.merchant_sn.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.merchant_name.toLowerCase().includes(searchFilter.toLowerCase());
  });
  // console.log("filteredData.length = "+filteredData.length);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const removeRecord = (id) => {
    const result = Array.from(apiData).filter((item) => item.id != id);
    setApiData(result);
  }; 

  const handleShow = (merchantId) => {
    setMerchantId(merchantId);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleSure = () => {
    setShow(false);
    // console.log("delete "+merchantId);
    deleteMerchant(merchantId);
  };  
  const deleteMerchant = (userId) => {
    call_post_as_user("/api/merchant/remove", {id:merchantId})
    .then((resp) => {
      if (resp.meta.status == true) {
        removeRecord(merchantId);
        Router.push("/m/merchant/listMerchants");
        //Router.refresh();
      }
    });
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Merchants
        </Breadcrumb.Item>
      </Breadcrumb>

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
        <Button variant="primary" onClick={(e)=>{
          e.preventDefault();
          Router.push("/m/merchant/add");
        }}>Add</Button>{' '}
        </Col>
      </Row>
    </Container>
      <Table striped bordered hover id='table'>
        <tbody>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th>Name</th>
            <th>Nation</th>
            <th>Province</th>
            <th>City</th>
            <th>SN</th>
            <th>Phone</th>
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.merchant_name}</td>
                <td>{item.nation}</td>
                <td>{item.province}</td>
                <td>{item.city}</td>
                <td>{item.merchant_sn}</td>
                <td>{item.phone_number}</td>
                <td>
                <Button variant="outline-primary" onClick={(e)=>{
                  e.preventDefault();
                  handleShow(item.id);
                }}>Delete</Button>
                {' '}
                <Button variant="outline-primary" onClick={(e)=>{
                  e.preventDefault();
                  Router.push("/m/merchant/listMerchantOwners?merchant="+item.id);
                }}>Owners</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No data found</td>
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

export default ListMerchants;