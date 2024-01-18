'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddMerchantForm from "@/components/merchant/addMerchant";
 

export default async  function AddMerchantPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Container>
      <Row>
        <Col>
          <AddMerchantForm/>
        </Col>
      </Row>
    </Container>
  );
}
