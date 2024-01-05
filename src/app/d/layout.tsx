
import {TireHeader} from "@/components/header";
import TireFooter from "@/components/footer";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


export default function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack gap={5}>
      <div className="p-2">
        <TireHeader />
      </div>
      <div className="p-2">
        <Container>
          <Row>
            <Col></Col>
            <Col xs={6}>{children}</Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
      <div className="p-2">
        <TireFooter />
      </div>
    </Stack>
  );
}
