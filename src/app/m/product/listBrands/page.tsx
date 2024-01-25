'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListBrands from "@/components/product/listBrands";
import { extract_user_basicinfo, get_backend_as_user } from "@/dao/call4server";
 

export default async  function BrandsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const getBrands = async () => {
    const data = await get_backend_as_user("/api/brand/queryAllBrands");
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const brands = await getBrands();

  return (
    <Container>
      <Row>
        <Col>
          <ListBrands brands={brands} />
        </Col>
      </Row>
    </Container>
  );
}
