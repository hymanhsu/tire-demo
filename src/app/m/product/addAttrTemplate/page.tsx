'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddAttrTemplateForm from "@/components/product/addAttrTemplate";
import { extract_user_basicinfo } from "@/dao/call4server";
 

export default async  function AddAttrTemplatePage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [ userId, role, merchantId, _] = await extract_user_basicinfo();
  
  return (
    <Container>
      <Row>
        <Col>
          <AddAttrTemplateForm merchantId={merchantId}/>
        </Col>
      </Row>
    </Container>
  );
}
