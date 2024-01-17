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


const allowDisplay = (role: string, targets: string[]): boolean => {
  return targets.includes(role);
};

export function AdminHeader({userinfo, role}:{userinfo:{nick_name:string}, role:string}) {
  const Router = useRouter();

  const onLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch("/admin/api/auth/logoutAsUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(response => response.json())
    .then((resp:any) => {
      console.log("------------logout as user-------------");
      Router.push("/admin/auth/login");
      Router.refresh();
    });
    // window.location.href = "/admin/";
  };

  const menuOfAdministrator = () => {
    return (
      <>
        <NavDropdown title="Partners" id="basic-nav-dropdown">
          <NavDropdown.Item href="/admin/merchant/listMerchants">
            Merchants
          </NavDropdown.Item>
          <NavDropdown.Item href="/admin/merchant/listAdministrators">
            Administrators
          </NavDropdown.Item> 
        </NavDropdown>
      </>
    );
  };

  const menuOfMerchantOwner = () => {
    return (
      <>
        <NavDropdown title="Merchant" id="basic-nav-dropdown">
          <NavDropdown.Item href="/service/maintence">
            Workshops
          </NavDropdown.Item>
          <NavDropdown.Item href="/service/fix">
            Managers & Staffs
          </NavDropdown.Item>
          <NavDropdown.Item href="/service/installation">
            Products
          </NavDropdown.Item>
          <NavDropdown.Item href="/service/installation">SKU</NavDropdown.Item>
          <NavDropdown.Item href="/service/installation">
            Stock
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Customer" id="basic-nav-dropdown">
          <NavDropdown.Item href="/service/maintence">
            Customers
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const menuOfWorkshopMember = () => {
    return (
      <>
        <NavDropdown title="Order" id="basic-nav-dropdown">
          <NavDropdown.Item href="/service/maintence">Orders</NavDropdown.Item>
          <NavDropdown.Item href="/service/fix">Refunds</NavDropdown.Item>
        </NavDropdown>
      </>
    );
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
        <Navbar.Brand href="/admin/dashboard">Administration</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {allowDisplay(role, ["ROOT", "ADMN"]) && (
              <>
              {menuOfAdministrator()}
              </>
            )}
            {allowDisplay(role, ["MERT"]) && (
              <>
              {menuOfMerchantOwner()}
              </>
            )}
            {allowDisplay(role, ["MANR", "STAF"]) && (
              <>
              {menuOfWorkshopMember()}
              </>
            )}
          </Nav>
          <Nav>
            {userinfo.nick_name == "" && (
              <>
                <Nav.Link href="/admin/auth/login">Login in</Nav.Link>
              </>
            )}
            {userinfo.nick_name != "" && (
              <>
                <Navbar.Text>Welcome, {userinfo.nick_name}!</Navbar.Text>
                <Nav.Link onClick={onLogout}>{">>"}Login out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
