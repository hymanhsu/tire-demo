'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddAttrTemplateDetailForm from "@/components/product/addAttrTemplateDetail";
import { extract_user_basicinfo } from "@/dao/call4server";
 

export default async  function AddAttrTemplateDetailPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const templateId = searchParams["template"] as string;
  const templateType = searchParams["type"] as string;
  
  return (
    <Container>
      <Row>
        <Col>
          <AddAttrTemplateDetailForm templateId={templateId} templateType={templateType}/>
        </Col>
      </Row>
    </Container>
  );
}
