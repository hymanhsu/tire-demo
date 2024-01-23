'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddWorkshopMemberForm from "@/components/merchant/addWorkshopMember";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";
 

export default async  function AddWorkshopMemberPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [userId, role, merchantId, _] = await extract_user_basicinfo();
  const workshopId = searchParams["workshop"] as string;
  
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

  return (
    <Container>
      <Row>
        <Col>
          <AddWorkshopMemberForm merchant={merchant} workshop={workshop} members={data}/>
        </Col>
      </Row>
    </Container>
  );
}
