'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListMerchants from "@/components/merchant/listMerchants";
import { get_backend, reset_token, try_refresh_token } from "@/dao/call4server";
import { cookies } from "next/headers";
 

export default async  function MerchantsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const getData = async () => {
    const data = await get_backend("/api/merchant/queryAll");
    // const ntoken = await try_refresh_token(data);
    // if(ntoken != null){
    //   // reset_token(ntoken);
    //   cookies().set('token', ntoken, { secure: true });
    // }
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
          <ListMerchants merchants={data}/>
        </Col>
      </Row>
    </Container>
  );
}
