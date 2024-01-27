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


const ListAttrTemplates = ({ templates }) => {
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const Router = useRouter();
  const [apiData, setApiData] = useState(templates); // set the api data 
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
    return item.template_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.template_type.toLowerCase().includes(searchFilter.toLowerCase());
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

  const handleShow = (templateId) => {
    setDeletedId(templateId);
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const handleSure = () => {
    setShow(false);
    // console.log("delete "+merchantId);
    deleteTemplate();
  };
  const deleteTemplate = () => {
    call_post_as_user("/api/product/removeAttrTemplate", { id: deletedId })
      .then((resp) => {
        if (resp.meta.status == true) {
          removeRecord(deletedId);
          Router.push("/m/product/listAttrTemplates");
          //Router.refresh();
        }
      });
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>
          Attribute Templates
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
              Router.push("/m/product/addAttrTemplate");
            }}>Add</Button>{' '}
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover id='table'>
        <tbody>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.template_name}</td>
                <td>{item.template_type}</td>
                <td>{item.description}</td>
                <td>
                  <Button variant="outline-primary" onClick={(e) => {
                    e.preventDefault();
                    handleShow(item.id);
                  }}>Delete</Button>
                  {' '}
                  <Button variant="outline-primary" onClick={(e) => {
                    e.preventDefault();
                    Router.push("/m/product/listAttrTemplateDetails?template="+item.id+"&type="+item.template_type);
                  }}>Define Template</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data found</td>
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
        handleSure={handleSure} />
    </div>
  );
};

export default ListAttrTemplates;