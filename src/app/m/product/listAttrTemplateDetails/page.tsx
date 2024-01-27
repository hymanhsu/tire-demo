'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListAttrTemplateDetails from "@/components/product/listAttrTemplateDetails";
import { extract_user_basicinfo, post_backend_as_user } from "@/dao/call4server";
 

export default async  function AttrTemplateDetailsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [ userId, role, merchantId, _] = await extract_user_basicinfo();
  const templateId = searchParams["template"] as string;
  const templateType = searchParams["type"] as string;

  const getAttrTemplateDetails = async () => {
    const data = await post_backend_as_user("/api/product/queryAllAttrTemplateDetails",{
      attr_templ_id : templateId
    });
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const attrTemplateDetails = await getAttrTemplateDetails();

  return (
    <Container>
      <Row>
        <Col>
          <ListAttrTemplateDetails templateId={templateId} templateType={templateType} data={attrTemplateDetails} />
        </Col>
      </Row>
    </Container>
  );
}
