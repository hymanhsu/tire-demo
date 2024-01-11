import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import MerchantList from "@/components/merchant/merchantList";
import ListMerchants from "@/components/merchant/listMerchants";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { get_backend } from "@/dao/call4server";
 

async function getData() {
  const res = await get_backend("/api/merchant/queryAll");
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
 
  if (!res.meta.status) {
    // This will activate the closest `error.js` Error Boundary
    return [];
  }
 
  return res.data;
}

export default async  function MerchantsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
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
