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


const ListAttrTemplateDetails = ({ templateId, templateType, data }) => {
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState("");
  const Router = useRouter();
  const [apiData, setApiData] = useState(data); // set the api data 
  const [searchFilter, setSearchFilter] = useState(''); // filter the search
  const [currentPage, setCurrentPage] = useState(1); // set the current page
  const pageSize = 50; // show row in table

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
    return item.attr_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.attr_type.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.param_name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.title.toLowerCase().includes(searchFilter.toLowerCase());
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
    deleteTemplateDetail();
  };
  const deleteTemplateDetail = () => {
    call_post_as_user("/api/product/removeAttrTemplateDetail", { id: deletedId })
      .then((resp) => {
        if (resp.meta.status == true) {
          removeRecord(deletedId);
          Router.push("/m/product/listAttrTemplateDetails?template="+templateId+"&type="+templateType);
          //Router.refresh();
        }
      });
  }

  const displayFixedLength = (str, len) => {
    if(str == undefined || str == null || str == ""){
      return "";
    }
    if(str.length > len){
      return str.substring(0,len);
    }else{
      return str;
    }
  }

  return (
    <div className='fluid container'>
      <Breadcrumb>
        <Breadcrumb.Item href="/m">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/m/product/listAttrTemplates">
          Attribute Templates
        </Breadcrumb.Item>
        <Breadcrumb.Item active>
          Defines
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
              Router.push("/m/product/addAttrTemplateDetail?template="+templateId+"&type="+templateType);
            }}>Add</Button>{' '}
          </Col>
        </Row>
      </Container>
      <Table striped bordered hover id='table'>
        <tbody>
          <tr>
            <th style={{ width: '4%' }}>#</th>
            <th>Attribute</th>
            <th>Type</th>
            <th>Parameter</th>
            <th>Title</th>
            <th>Description</th>
            <th>Operations</th>
          </tr>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, i) => (
              <tr key={i} style={{ background: '#fff' }}>
                <td>{(currentPage - 1) * pageSize + i + 1}</td>
                <td>{item.attr_name}</td>
                <td>{item.attr_type}</td>
                <td>{item.param_name}</td>
                <td>{item.title}</td>
                <td>{displayFixedLength(item.description)}</td>
                <td>
                  <Button variant="outline-danger" onClick={(e) => {
                    e.preventDefault();
                    handleShow(item.id);
                  }}>Delete</Button>
                </td>
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
      <ConfirmDialog
        title={'Confirmation for deletion'}
        content={'Unable to recover data after deletion! Are you sure to delete data?'}
        show={show}
        handleClose={handleClose}
        handleSure={handleSure} />
    </div>
  );
};

export default ListAttrTemplateDetails;