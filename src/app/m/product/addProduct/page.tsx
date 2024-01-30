'use server'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AddProductForm from "@/components/product/addProduct";
import { extract_user_basicinfo, get_backend_as_user, post_backend_as_user } from "@/dao/call4server";
 

export default async  function AddProductPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const [ userId, role, merchantId, _] = await extract_user_basicinfo();

  const getCategories = async () => {
    const data = await get_backend_as_user("/api/category/queryAllCategories");
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const categories = await getCategories();
  
  const getBrands = async () => {
    const data = await get_backend_as_user("/api/brand/queryAllBrands");
    if (!data.meta.status) {
      return [];
    }
    return data.data;
  };
  const brands = await getBrands();

  const getTemplates = async () => {
    const data = await post_backend_as_user("/api/product/queryAllAttrTemplates",{
      merchant_id: merchantId,
      template_type: "SPU",
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
          <AddProductForm merchantId={merchantId} categories={categories} brands={brands} templates={templates}/>
        </Col>
      </Row>
    </Container>
  );
}
