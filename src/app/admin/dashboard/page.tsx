import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "@/components/auth/loginForm";

export default function Dashboard() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <div>
            Hello world
          </div>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
