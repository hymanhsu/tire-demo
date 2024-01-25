'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListCategories from "@/components/product/listCategories";
import { extract_user_basicinfo, get_backend_as_user } from "@/dao/call4server";
 

export default async  function CategoriesPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const getCategories = async () => {
    const data = await get_backend_as_user("/api/category/queryAllCategories");
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const categories = await getCategories();

  return (
    <Container>
      <Row>
        <Col>
          <ListCategories categories={categories} />
        </Col>
      </Row>
    </Container>
  );
}
