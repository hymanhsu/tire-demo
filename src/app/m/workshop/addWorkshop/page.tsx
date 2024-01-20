'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddWorkshopForm from "@/components/merchant/addWorkshop";
import { post_backend_as_user } from "@/dao/call4server";
 

export default async  function AddMerchantPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const merchantId = searchParams["merchant"] as string;
  const getMerchant = async () => {
    const data = await post_backend_as_user("/api/merchant/queryOne", {
      id : merchantId
    });
    if (!data.meta.status) {
      return {};
    }
    return data.data;
  };
  const merchant = await getMerchant();
  return (
    <Container>
      <Row>
        <Col>
          <AddWorkshopForm merchant={merchant}/>
        </Col>
      </Row>
    </Container>
  );
}