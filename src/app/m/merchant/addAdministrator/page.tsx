'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddAdministratorForm from "@/components/merchant/addAdministrator";
 

export default async  function AddMerchantPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const merchantId = searchParams["merchant"] as string;
  return (
    <Container>
      <Row>
        <Col>
          <AddAdministratorForm/>
        </Col>
      </Row>
    </Container>
  );
}
