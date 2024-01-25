'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddBrandForm from "@/components/product/addBrand";
 

export default async  function AddBrandPage({
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
          <AddBrandForm/>
        </Col>
      </Row>
    </Container>
  );
}
