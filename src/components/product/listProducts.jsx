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
import { ConfirmDialog } from '@/components/confirmDialog';
import _ from 'lodash';


const ListProducts = ({ products, merchantId }) => {
  const [show, setShow] = useState(false);
  const [showTitle, setShowTitle] = useState("");
  const [showBody, setShowBody] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [selectedOperation, setSelectedOperation] = useState("");
  const Router = useRouter();
  const [apiData, setApiData] = useState(products); // set the api data 
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
    return item.spu_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.category_title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.attr_templ_title.toLowerCase().includes(searchFilter.toLowerCase());
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

  const updateRecordStatus = (id, status) => {
    let cloneRecords = _.cloneDeep(apiData);
    Array.from(cloneRecords).forEach((element) => {
      if(element.id == id){
        element.status = status;
      }
    });
    setApiData(cloneRecords);
  };

  const handleDelete = (productId) => {
    setShowTitle("Confirmation for deletion");
    setShowBody("Unable to recover data after deletion! Are you sure to delete data?");
    setSelectedId(productId);
    setSelectedOperation("Delete");
    setShow(true);
  };
  const handleOnline = (productId) => {
    setShowTitle("Confirmation for online");
    setShowBody("Do you want to publish this product?");
    setSelectedId(productId);
    setSelectedOperation("Online");
    setShow(true);
  };
  const handleOffline = (productId) => {
    setShowTitle("Confirmation for offline");
    setShowBody("Do you want to offline this product?");
    setSelectedId(productId);
    setSelectedOperation("Offline");
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleSure = () => {
    setShow(false);
    // console.log("delete "+merchantId);
    if(selectedOperation == "Delete"){
      deleteProduct();
    }
    if(selectedOperation == "Online"){
      changeProductStatus("ONLINE");
    }
    if(selectedOperation == "Offline"){
      changeProductStatus("OFFLINE");
    }
  };
  const deleteProduct = () => {
    call_post_as_user("/api/product/removeProduct", { id: selectedId })
      .then((resp) => {
        if (resp.meta.status == true) {
          removeRecord(selectedId);
          Router.push("/m/product/listProducts");
          //Router.refresh();
        }
      });
  }

  const changeProductStatus = (status) => {
    call_post_as_user("/api/product/changeProductStatus", { id: selectedId, status: status })
      .then((resp) => {
        if (resp.meta.status == true) {
          updateRecordStatus(selectedId, status);
          Router.push("/m/product/listProducts");
          //Router.refresh();
        }
      });
  }

  const displayStatus = (status) => {
    switch (status) {
      case "INITIAL":
        return "Created";
      case "ONLINE":
        return "Online";
      case "OFFLINE":
        return "Offline";
    }
    return "";
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Products
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
            <Button variant="primary" onClick={(e) => {
              e.preventDefault();
              Router.push("/m/product/addProduct");
            }}>Add</Button>{' '}
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover id='table'>
        <tbody>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th>Title</th>
            <th>SPU Name</th>
            <th>brand</th>
            <th>Category</th>
            <th>Template</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.title}</td>
                <td>{item.spu_name}</td>
                <td>{item.brand}</td>
                <td>{item.category_title}</td>
                <td>{item.attr_templ_title}</td>
                <td>{displayStatus(item.status)}</td>
                <td>
                  {
                    (item.status == "INITIAL" || item.status == "OFFLINE") && 
                    <>
                    <Button variant="outline-primary" onClick={(e) => {
                      e.preventDefault();
                      handleDelete(item.id);
                    }}>Delete</Button>
                    {" "}
                    </>
                  }
                  {
                    (item.status == "INITIAL" || item.status == "OFFLINE") && 
                    <>
                    <Button variant="outline-primary" onClick={(e) => {
                      e.preventDefault();
                      handleOnline(item.id);
                    }}>Online</Button>
                    {" "}
                    </>
                  }
                  {
                    (item.status == "ONLINE") && 
                    <>
                    <Button variant="outline-primary" onClick={(e) => {
                      e.preventDefault();
                      handleOffline(item.id);
                    }}>Offline</Button>
                    {" "}
                    </>
                  }
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
        title={showTitle}
        content={showBody}
        show={show}
        handleClose={handleClose}
        handleSure={handleSure} />
    </div>
  );
};

export default ListProducts;