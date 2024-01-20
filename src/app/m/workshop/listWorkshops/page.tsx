'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListWorkshops from "@/components/merchant/listWorkshops";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";
 

export default async  function WorkshopsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [userId, role, merchantId, workshopId] = await extract_user_basicinfo();

  const getWorkshops = async () => {
    const data = await post_backend_as_user("/api/merchant/queryAllWorkshops", {
      merchant_id : merchantId
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const workshops = await getWorkshops();
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
          <ListWorkshops workshops={workshops} merchant={merchant}/>
        </Col>
      </Row>
    </Container>
  );
}
