"use client";

import Image from "next/image";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import VisaPic from "@/public/visa.svg";
import MasterCardPic from "@/public/mastercard.svg";
import PaypalPic from "@/public/paypal.svg";
import UnionpayPic from "@/public/unionpay.svg";

const currentYear = new Date().getFullYear();

export default function TireFooter() {
  return (
    <footer>
      <Container className="p-3 mb-2 bg-dark text-white">
        <Row>
          <Col>
            <h5>
              1000 Centre St N, <br />
              Calgary, <br />
              AB T2E 7W6
            </h5>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link eventKey="link-1" href="/">
                <span className="p-3 mb-2 bg-dark text-white">News</span>
              </Nav.Link>
              <Nav.Link eventKey="link-2" href="/">
                <span className="p-3 mb-2 bg-dark text-white">Resources</span>
              </Nav.Link>
              <Nav.Link eventKey="link-3" href="/">
                <span className="p-3 mb-2 bg-dark text-white">Solutions</span>
              </Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link eventKey="link-1">
                <span className="p-3 mb-2 bg-dark text-white">About us</span>
              </Nav.Link>
              <Nav.Link eventKey="link-2">
                <span className="p-3 mb-2 bg-dark text-white"> Contact</span>
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <div>
              &copy; {currentYear} Tire of Crestmont. All Rights Reserved.
            </div>
          </Col>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="p-1">
                <Image
                  src={VisaPic}
                  alt="visa"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </div>
              <div className="p-1">
                <Image
                  src={MasterCardPic}
                  alt="mastercard"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </div>
              <div className="p-1">
                <Image
                  src={PaypalPic}
                  alt="paypal"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </div>
              <div className="p-1">
                <Image
                  src={UnionpayPic}
                  alt="unionpay"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
