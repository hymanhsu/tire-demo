
import {AdminHeader} from "@/components/header";
import TireFooter from "@/components/footer";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Stack gap={5}>
      <div className="p-2">
        <AdminHeader />
      </div>
      <div className="p-2">
        <Container>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </div>
    </Stack>
  );
}
