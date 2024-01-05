import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SignupForm from "@/components/signupForm";

export default function Signup() {
  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <SignupForm />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
