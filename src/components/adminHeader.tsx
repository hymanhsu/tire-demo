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

export function AdminHeader({
  userinfo,
  role,
}: {
  userinfo: { nick_name: string };
  role: string;
}) {
  const Router = useRouter();

  const onLogout = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    fetch("/m/api/auth/logoutAsUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((resp: any) => {
        console.log("------------logout as user-------------");
        Router.push("/m/auth/login");
        Router.refresh();
      });
  };

  const menuOfAdministrator = () => {
    return (
      <>
        <NavDropdown title="Partners" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/merchant/listAdministrators">
            Administrators
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/merchant/listMerchants">
            Merchants
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Product" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/product/listCategories">
            Categories
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/product/listBrands">
            Brands
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const menuOfMerchantOwner = () => {
    return (
      <>
        <NavDropdown title="Workshop" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/workshop/listMerchantMembers">
            Employees
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/workshop/listWorkshops">
            Workshops
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Inventory" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/product/listAttrTemplates">
            Attribute Templates
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/product/listProducts">
            Products
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/inventory/listSKUs">SKU</NavDropdown.Item>
          <NavDropdown.Item href="/m/inventory/listStocks">
            Stocks
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const menuOfWorkshopManager = () => {
    return (
      <>
        <NavDropdown title="Order" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/order/listOrders">Orders</NavDropdown.Item>
          <NavDropdown.Item href="/m/order/listRefunds">
            Refunds
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Work assignment" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/work/listAppointments">
            Appointments
          </NavDropdown.Item>
          <NavDropdown.Item href="/m/work/listUnassignedTasks">
            Assign Tasks
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Task" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/task/listMyTasks">
            My Tasks
          </NavDropdown.Item>
        </NavDropdown>
      </>
    );
  };

  const menuOfWorkshopStaff = () => {
    return (
      <>
        <NavDropdown title="Order" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/order/listOrders">Orders</NavDropdown.Item>
          <NavDropdown.Item href="/m/order/listRefunds">
            Refunds
          </NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Task" id="basic-nav-dropdown">
          <NavDropdown.Item href="/m/task/listMyTasks">
            My Tasks
          </NavDropdown.Item>
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
        <Navbar.Brand href="/m/dashboard">Administration</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {allowDisplay(role, ["ROOT", "ADMN"]) && (
              <>{menuOfAdministrator()}</>
            )}
            {allowDisplay(role, ["MERT"]) && <>{menuOfMerchantOwner()}</>}
            {allowDisplay(role, ["MANR"]) && <>{menuOfWorkshopManager()}</>}
            {allowDisplay(role, ["STAF"]) && <>{menuOfWorkshopStaff()}</>}
          </Nav>
          <Nav>
            {userinfo.nick_name == "" && (
              <>
                <Nav.Link href="/m/auth/login">Log in</Nav.Link>
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
