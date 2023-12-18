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
      <Container>
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
                News
              </Nav.Link>
              <Nav.Link eventKey="link-2" href="/">
                Resources
              </Nav.Link>
              <Nav.Link eventKey="link-3" href="/">
                Solutions
              </Nav.Link>
            </Nav>
          </Col>
          <Col>
            <Nav defaultActiveKey="/" className="flex-column">
              <Nav.Link eventKey="link-1">About us</Nav.Link>
              <Nav.Link eventKey="link-2">Contact</Nav.Link>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
          <div className="p-2">
              &copy; {currentYear}{" "}
              <a href="https://material-tailwind.com/">Tire of Crestmont</a>.
              All Rights Reserved.
            </div>
          </Col>
          <Col>
            <Stack direction="horizontal" gap={3}>
              <div className="p-1">
                <Image src={VisaPic} alt="visa" width="30" height="30" className="d-inline-block align-top"/>
              </div>
              <div className="p-1">
              <Image src={MasterCardPic} alt="mastercard" width="30" height="30" className="d-inline-block align-top"/>
              </div>
              <div className="p-1">
              <Image src={PaypalPic} alt="paypal" width="30" height="30" className="d-inline-block align-top"/>
              </div>
              <div className="p-1">
              <Image src={UnionpayPic} alt="unionpay" width="30" height="30" className="d-inline-block align-top"/>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
