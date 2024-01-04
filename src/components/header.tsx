"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoPic from "@/public/car-wheel.svg";
import ShoppingCartPic from "@/public/cart4.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function TireHeader() {
  const [userInfo, setUserInfo] = useState({ nick_name: "" });
  useEffect(() => {
    const localData = localStorage.getItem("userinfo");
    const userInfoUp = localData ? JSON.parse(localData) : { nick_name: "" };
    setUserInfo({ ...userInfo, ...userInfoUp });
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src={LogoPic}
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Tire of Crestmont
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products/tire">Tire</Nav.Link>
            <Nav.Link href="/products/accessories">Accessories</Nav.Link>
            <NavDropdown title="Service" id="basic-nav-dropdown">
              <NavDropdown.Item href="/service/maintence">
                Maintence
              </NavDropdown.Item>
              <NavDropdown.Item href="/service/fix">Fix</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/service/installation">
                Installation
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">
              <Image
                src={ShoppingCartPic}
                alt="Logo"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
            </Nav.Link>
            {userInfo.nick_name == "" && (
              <>
                <Nav.Link href="/auth/signup">Sign up</Nav.Link>
                <Nav.Link href="/auth/login">Login in</Nav.Link>
              </>
            )}
            {userInfo.nick_name != "" && (
              <>
                <Navbar.Text>Welcome, {userInfo.nick_name}!</Navbar.Text>
                <Nav.Link href="/auth/logout">{">>"}Login out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TireHeader;
