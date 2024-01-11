import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginForm from "@/components/auth/loginForm";

export default function Login() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <LoginForm />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
