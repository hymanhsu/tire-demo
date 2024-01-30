'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditProductAttrForm from "@/components/product/editProductAttrs";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";


export default async  function ProductAttributesPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [ userId, role, merchantId, _] = await extract_user_basicinfo();
  const productId = searchParams["product"] as string;

  const getProductAttrs = async () => {
    const data = await post_backend_as_user("/api/product/queryProductAttrs",{
      product_id: productId,
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const attrs = await getProductAttrs();
  // console.log(attrs);

  return (
    <Container>
      <Row>
        <Col>
          <EditProductAttrForm productId={productId} attrs={attrs}/>
        </Col>
      </Row>
    </Container>
  );
}
