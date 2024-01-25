"use client";

import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import { CornerDownRight } from 'react-feather';
import { call_post_as_user } from "@/dao/call";
import _ from 'lodash';

/**
 * data: 
[
        {
            "id": "080",
            "parent": null,
            "label": "level 1 title 001",
            "priority": 0,
            "level": 1,
            "nodes": [
                {
                    "id": "21e",
                    "parent": "080",
                    "label": "level 2 title 004",
                    "priority": 120,
                    "level": 2,
                    "nodes": [
                        {
                            "id": "8f9",
                            "parent": "21e",
                            "label": "level 3 title 006",
                            "priority": 250,
                            "level": 3
                        },
                        {
                            "id": "a9e",
                            "parent": "21e",
                            "label": "level 3 title 007",
                            "priority": 290,
                            "level": 3
                        }
                    ]
                }
            ]
        },
        ....
 * 
 * @param  param0 
 * @returns 
 */
export function CategoryTreeView({ data }) {
    const [nodes, setNodes] = useState(data);
    const [formData, setFormData] = useState({
        level: 1,
        priority: 0,
        title: "",
        introduction: "",
        parent_category_id: "",
    });
    const [show, setShow] = useState(false);

    let counter = 1;
    const getCounter = () => {
        return counter++;
    }

    const handleShow = () => {
        setShow(true);
    }

    const addNodeIntoSiblingNodes = (parent, nodes, data) => {
        let inserted = false;
        for (let i = 0; i < nodes.length; ++i) {
            const element = nodes[i];
            if (data.priority < element.priority) {
                nodes.splice(i, 0, {
                    id: data.id,
                    parent: parent,
                    label: data.title,
                    priority: data.priority,
                    level: data.level,
                    nodes: undefined,
                });
                inserted = true;
                break;
            }
        }
        if (!inserted) {
            nodes.push({
                id: data.id,
                parent: parent,
                label: data.title,
                priority: data.priority,
                level: data.level,
                nodes: undefined,
            });
        }
    }

    const addNode2Nodes = (data) => {
        console.log(data);
        let cloneNodes = _.cloneDeep(nodes);
        if (data.parent_category_id == "" && data.level == 1) {
            addNodeIntoSiblingNodes(null, cloneNodes, data);
            console.log(cloneNodes);
            setNodes(cloneNodes);
            return;
        }
        if (data.parent_category_id != "" && data.level == 1) {
            return;
        }
        for (let i = 0; i < cloneNodes.length; ++i) {
            const element = cloneNodes[i];
            // try top level
            if (data.level == 2 && element.id == data.parent_category_id) {
                if (element.nodes == undefined) {
                    element.nodes = [];
                }
                addNodeIntoSiblingNodes(element.id, element.nodes, data);
                console.log(cloneNodes);
                setNodes(cloneNodes);
                return;
            }
            if (data.level == 3 && element.nodes != undefined && element.nodes.length > 0) {
                for (let j = 0; j < element.nodes.length; ++j) {
                    const element2 = element.nodes[j];
                    // try second level
                    if (element2.id == data.parent_category_id) {
                        if (element2.nodes == undefined) {
                            element2.nodes = [];
                        }
                        addNodeIntoSiblingNodes(element2.id, element2.nodes, data);
                        console.log(cloneNodes);
                        setNodes(cloneNodes);
                        return;
                    }
                }
            }
        }
    }

    const handleAdd = () => {
        // addNode2Nodes(formData);
        // setShow(false);
        call_post_as_user("/api/category/addCategory", formData)
            .then((resp) => {
                if (resp.meta.status == true) {
                    addNode2Nodes({
                        ...formData,
                        id: resp.data.id,
                    });
                    setShow(false);
                    // Router.push("/m/product/listCategories");
                }
            }
            );
    }

    const removeNodeFromSiblingNodes = (nodes, id) => {
        let index = -1;
        for (let i = 0; i < nodes.length; ++i) {
            const element = nodes[i];
            if (element.id == id) {
                index = i;
                break;
            }
        }
        if (index != -1) {
            nodes.splice(index, 1);
        }
    }

    const removeNode4Nodes = (id, level, parent) => {
        console.log(`id=${id}, level=${level}, parent=${parent}`);
        let cloneNodes = _.cloneDeep(nodes);
        if (level == 1) {
            removeNodeFromSiblingNodes(cloneNodes, id);
            console.log(cloneNodes);
            setNodes(cloneNodes);
            return;
        }
        for (let i = 0; i < cloneNodes.length; ++i) {
            const element = cloneNodes[i];
            if (level == 2 && element.id == parent) {
                removeNodeFromSiblingNodes(element.nodes, id);
                console.log(cloneNodes);
                setNodes(cloneNodes);
                return;
            }
            if (level == 3 && element.nodes != undefined && element.nodes.length > 0) {
                for (let j = 0; j < element.nodes.length; ++j) {
                    const element2 = element.nodes[j];
                    if (element2.id == parent) {
                        removeNodeFromSiblingNodes(element2.nodes, id);
                        console.log(cloneNodes);
                        setNodes(cloneNodes);
                        return;
                    }
                }
            }
        }
    }

    const handleRemove = (id, level, parent) => {
        // removeNode4Nodes(id, level, parent);
        call_post_as_user("/api/category/removeCategory", { id: id })
            .then((resp) => {
                if (resp.meta.status == true) {
                    removeNode4Nodes(id, level, parent);
                    // Router.push("/m/product/listCategories");
                }
            }
            );
    }

    const handleClose = () => setShow(false);

    const renderNode = (node, index) => {
        return (
            <React.Fragment key={getCounter()}>
                <ListGroup.Item>
                    <Container >
                        <Row >
                            {node.level == 1 && (
                                <>
                                    <Col sm={9} >{node.label}</Col>
                                    <Col sm={1} >{node.priority}</Col>
                                </>
                            )}
                            {node.level == 2 && (
                                <>
                                    <Col sm={1} ></Col>
                                    <Col sm={8} ><CornerDownRight />{node.label}</Col>
                                    <Col sm={1} >{node.priority}</Col>
                                </>
                            )}
                            {node.level == 3 && (
                                <>
                                    <Col sm={2} ></Col>
                                    <Col sm={7} ><CornerDownRight />{node.label}</Col>
                                    <Col sm={1} >{node.priority}</Col>
                                </>
                            )}
                            <Col sm={2} >
                                {
                                    (node.nodes == undefined || node.nodes.length == 0) && <Button variant="primary" onClick={(e) => {
                                        e.preventDefault();
                                        handleRemove(node.id, node.level, node.parent);
                                    }}>-</Button>
                                }
                                {' '}
                                {
                                    node.level != 3 && <Button variant="primary" onClick={(e) => {
                                        e.preventDefault();
                                        setFormData({
                                            level: node.level + 1,
                                            parent_category_id: node.id,
                                            priority: 0,
                                            title: "",
                                            introduction: "",
                                        });
                                        handleShow();
                                    }}>+</Button>
                                }
                            </Col>
                        </Row>
                    </Container>
                </ListGroup.Item>
                {node.nodes != undefined && (
                    node.nodes.map((node, i) => renderNode(node, i))
                )}
            </React.Fragment>
        );
    }

    if (nodes.length == 0) {
        return (
            <Button variant="primary">+</Button>
        );
    }

    return (
        <Stack gap={3}>
            <div className="p-2">
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Node</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Control size="sm" type="text" placeholder="Priority"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormData({ ...formData, priority: Number(e.target.value) });
                                }}
                                value={formData.priority}
                            />
                            <br />
                            <Form.Control size="sm" type="text" placeholder="Title"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormData({ ...formData, title: e.target.value });
                                }}
                                value={formData.title}
                            />
                            <br />
                            <Form.Control size="sm" type="text" placeholder="Introduction"
                                onChange={(e) => {
                                    e.preventDefault();
                                    setFormData({ ...formData, introduction: e.target.value });
                                }}
                                value={formData.introduction}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleAdd}>Add</Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" onClick={(e) => {
                    e.preventDefault();
                    setFormData({
                        level: 1,
                        parent_category_id: "",
                        priority: 0,
                        title: "",
                        introduction: "",
                    });
                    handleShow();
                }}>+</Button>
            </div>
            <div className="p-2">
                <ListGroup>
                    {
                        nodes.map((node, i) => renderNode(node, i))
                    }
                </ListGroup>
            </div>
        </Stack>
    );

}

