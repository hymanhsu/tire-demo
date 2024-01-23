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
  const [userId, role, merchantId, workshopId] = await extract_user_basicinfo();
  
  const getData = async () => {
    const data = await post_backend_as_user("/api/merchant/queryMembers",{
      merchant_id : merchantId
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
  return (
    <Container>
      <Row>
        <Col>
          <ListWorkshopMembers curruser={userId} members={data} merchant={merchant}/>
        </Col>
      </Row>
    </Container>
  );
}