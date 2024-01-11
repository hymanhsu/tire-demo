'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddMerchantForm from "@/components/merchant/addMerchant";
import { get_backend, post_backend, reset_token, try_refresh_token } from "@/dao/call4server";
 

export default async  function AddMerchantPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const merchantId = searchParams["merchant"];
  const getData = async () => {
    const data = await post_backend("/api/merchant/queryAllWorkshops", {
      merchant_id : merchantId
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const data = await getData();
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
