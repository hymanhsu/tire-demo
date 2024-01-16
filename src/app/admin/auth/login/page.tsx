import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoginAsUserForm from "@/components/auth/loginAsUserForm";

export default function Login() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <LoginAsUserForm />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
