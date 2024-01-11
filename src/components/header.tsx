"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoPic from "@/public/car-wheel.svg";
import ShoppingCartPic from "@/public/cart4.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {call_get} from "@/dao/call"

const onLogout = async (event: React.MouseEvent<HTMLElement>) => {
  const resp = await call_get("/api/auth/logout");
  console.log(resp);
  console.log("------------logout-------------");
  localStorage.removeItem("userinfo");
  console.log("------------remove userinfo/token/role-------------");
  window.location.href = "/";
};

const allowDisplay = (role:string, targets:string[]): boolean => {
  return targets.includes(role);
}

export function TireHeader() {
  const [userInfo, setUserInfo] = useState({ nick_name: "" });
  useEffect(() => {
    const localData = localStorage.getItem("userinfo");
    const userInfoUp = localData ? JSON.parse(localData) : { nick_name: "" };
    setUserInfo({ ...userInfo, ...userInfoUp });
  }, []);

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
            {userInfo.nick_name == "" && (
              <>
                <Nav.Link href="/d/auth/signup">Sign up</Nav.Link>
                <Nav.Link href="/d/auth/login">Login in</Nav.Link>
              </>
            )}
            {userInfo.nick_name != "" && (
              <>
                <Navbar.Text>Welcome, {userInfo.nick_name}!</Navbar.Text>
                <Nav.Link onClick={onLogout}>{">>"}Login out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// export default TireHeader;

export function AdminHeader() {
  const [userInfo, setUserInfo] = useState({ nick_name: "" });
  const [role, setRole] = useState("");
  useEffect(() => {
    const localData = localStorage.getItem("userinfo");
    const userInfoUp = localData ? JSON.parse(localData) : { nick_name: "" };
    setUserInfo({ ...userInfo, ...userInfoUp });
    const roleData = userInfoUp.role_id;
    setRole(roleData ? roleData as string : "");
  }, []);

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
            {allowDisplay(role, ["ROOT", "ADMN"]) && 
              <NavDropdown title="Partner" id="basic-nav-dropdown">
                <NavDropdown.Item href="/admin/merchant/listMerchants">
                  Merchants
                </NavDropdown.Item>
              </NavDropdown>
            }
            {allowDisplay(role, ["ROOT", "ADMN", "MERT", "MANR"]) && 
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
                <NavDropdown.Item href="/service/installation">
                  SKU
                </NavDropdown.Item>
                <NavDropdown.Item href="/service/installation">
                  Stock
                </NavDropdown.Item>
              </NavDropdown>
            }
            {allowDisplay(role, ["ROOT", "ADMN", "MERT", "MANR", "STAF"]) && 
              <NavDropdown title="Order" id="basic-nav-dropdown">
                <NavDropdown.Item href="/service/maintence">
                  Orders
                </NavDropdown.Item>
                <NavDropdown.Item href="/service/fix">
                  Refunds
                </NavDropdown.Item>
              </NavDropdown>
            }
            {allowDisplay(role, ["ROOT", "ADMN", "MERT", "MANR", "STAF"]) && 
              <NavDropdown title="Customer" id="basic-nav-dropdown">
                <NavDropdown.Item href="/service/maintence">
                  Customers
                </NavDropdown.Item>
              </NavDropdown>
            }
          </Nav>
          <Nav>
            {userInfo.nick_name == "" && (
              <>
                <Nav.Link href="/d/auth/signup">Sign up</Nav.Link>
                <Nav.Link href="/d/auth/login">Login in</Nav.Link>
              </>
            )}
            {userInfo.nick_name != "" && (
              <>
                <Navbar.Text>Welcome, {userInfo.nick_name}!</Navbar.Text>
                <Nav.Link onClick={onLogout}>{">>"}Login out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
