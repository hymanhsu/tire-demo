"use client";

import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import CustomPagination from '@/components/CustomPagination';
import { call_get } from "@/dao/call";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// const requireData = async () => {
//   const data = await call_get("/api/merchant/queryAll", true);
//   return data;
// }

const ListMerchants = ({merchants}) => {
  const [apiData, setApiData] = useState(merchants); // set the api data 
  const [searchFilter, setSearchFilter] = useState(''); // filter the search
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 3; // show row in table

  // useEffect(() => {
  //   requireData();
  // }, []);

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
  console.log("filteredData.length = "+filteredData.length);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className='fluid container'>
      <div className='mb-2 fw-50'>Merchants</div>

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
        <Col>Add new Merchant</Col>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data found</td>
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

export default ListMerchants;