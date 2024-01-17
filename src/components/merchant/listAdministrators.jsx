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
import { call_post_as_user } from "@/dao/call";


const ListAdministrators = ({administrators}) => {
  const Router = useRouter();
  const [apiData, setApiData] = useState(administrators); // set the api data 
  const [searchFilter, setSearchFilter] = useState(''); // filter the search
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 5; // show row in table

  // useEffect(() => {
  //   requireData();
  // }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilter]);

  const handleFilter = (e) => {
    setSearchFilter(e.target.value);
  };

  const removeRecord = (id) => {
    const result = Array.from(apiData).filter((item) => item.id != id);
    setApiData(result);
  }; 

  const filteredData = Array.from(apiData).filter((item) => {
    if (searchFilter == "") {
      return true;
    }
    return item.nick_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.phone_number.toLowerCase().includes(searchFilter.toLowerCase());
  });
  console.log("filteredData.length = "+filteredData.length);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Administrators
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
          Router.push("/admin/merchant/addAdministrator");
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
                {' '}
                <Button variant="outline-primary" onClick={(e)=>{
                  e.preventDefault();
                  call_post_as_user("/api/user/deleteUser", {id:item.id})
                  .then((resp) => {
                    if (resp.meta.status == true) {
                      removeRecord(item.id);
                      Router.push("/admin/merchant/listAdministrators");
                      //Router.refresh();
                    }
                  });
                }}>delete</Button>
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
    </div>
  );
};

export default ListAdministrators;