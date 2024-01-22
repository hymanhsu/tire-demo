"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoPic from "@/public/car-wheel.svg";
import ShoppingCartPic from "@/public/cart4.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useRouter } from "next/navigation";


export function TireHeader({userinfo}:{userinfo:{nick_name:string}}) {
  const Router = useRouter();

  const onLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch("/w/api/auth/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then((resp:any) => {
      console.log("------------logout as cust-------------");
      Router.push("/d/");
      Router.refresh();
    });
    // localStorage.removeItem("userinfo");
    // console.log("------------remove userinfo/token/role-------------");
    // window.location.href = "/d/";
  };
  
  return (
    <Navbar
      fixed="top"
      bg="primary"
      data-bs-theme="dark"
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary"
    >
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
            {userinfo.nick_name == "" && (
              <>
                <Nav.Link href="/w/auth/signup">Sign up</Nav.Link>
                <Nav.Link href="/w/auth/login">Log in</Nav.Link>
              </>
            )}
            {userinfo.nick_name != "" && (
              <>
                <Navbar.Text>Welcome, {userinfo.nick_name}!</Navbar.Text>
                <Nav.Link onClick={onLogout}>{">>"}Log out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

