'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListAttrTemplates from "@/components/product/listAttrTemplates";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";
 

export default async  function AttrTemplatesPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [ userId, role, merchantId, _] = await extract_user_basicinfo();

  const getTemplates = async () => {
    const data = await post_backend_as_user("/api/product/queryAllAttrTemplates",{
      merchant_id: merchantId,
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const templates = await getTemplates();

  return (
    <Container>
      <Row>
        <Col>
          <ListAttrTemplates templates={templates} />
        </Col>
      </Row>
    </Container>
  );
}
