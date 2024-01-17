'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListAdministrators from "@/components/merchant/listAdministrators";
import { get_backend_as_user } from "@/dao/call4server";
import { cookies } from "next/headers";
 

export default async  function AdministratorsPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const getData = async () => {
    const data = await get_backend_as_user("/api/user/findAllAdministrators");
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
          <ListAdministrators administrators={data}/>
        </Col>
      </Row>
    </Container>
  );
}
