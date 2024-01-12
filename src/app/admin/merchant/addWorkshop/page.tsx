'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddMerchantForm from "@/components/merchant/addMerchant";
import { get_backend, post_backend, reset_token, try_refresh_token } from "@/dao/call4server";
import AddWorkshopForm from "@/components/merchant/addWorkshop";
 

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
          <AddWorkshopForm merchantId={merchantId}/>
        </Col>
      </Row>
    </Container>
  );
}
