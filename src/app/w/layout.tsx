
import {TireHeader} from "@/components/header";
import TireFooter from "@/components/footer";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { cookies } from "next/headers";
import { get_backend_as_cust } from "@/dao/call4server";

interface UserInfo {
  nick_name: string;
}

const getUserInfo = async (): Promise<UserInfo> => {
  let token = cookies().get("token")?.value;
  if(token == undefined){
    return Promise.resolve({nick_name:""});
  }
  const resp = await get_backend_as_cust("/api/user/userinfo");
  if(resp.meta.status == true){
    return Promise.resolve(resp.data);
  }
  return Promise.resolve({nick_name:""});
}

export default async function BasicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();
  return (
    <Stack gap={5}>
      <div className="p-2">
        <TireHeader userinfo={userInfo}/>
      </div>
      <div className="p-2">
        <Container>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </div>
      <div className="p-2">
        <TireFooter />
      </div>
    </Stack>
  );
}
