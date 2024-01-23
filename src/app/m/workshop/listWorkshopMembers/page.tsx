'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListWorkshopMembers from "@/components/merchant/listWorkshopMembers";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";
import { cookies } from "next/headers";
 

export default async  function WorkshopMembersPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [userId, role, merchantId, _] = await extract_user_basicinfo();
  const workshopId = searchParams["workshop"] as string;
  
  const getData = async () => {
    const data = await post_backend_as_user("/api/merchant/queryWorkshopMembers",{
      merchant_id : merchantId,
      workshop_id : workshopId,
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const data = await getData();

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

  const getWorkshop = async () => {
    const data = await post_backend_as_user("/api/merchant/queryOneWorkshop", {
      id : workshopId
    });
    if (!data.meta.status) {
      return {};
    }
    return data.data;
  };
  const workshop = await getWorkshop();

  return (
    <Container>
      <Row>
        <Col>
          <ListWorkshopMembers members={data} merchant={merchant} workshop={workshop}/>
        </Col>
      </Row>
    </Container>
  );
}
