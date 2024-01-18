'use server';

import {AdminHeader} from "@/components/adminHeader";
import TireFooter from "@/components/footer";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { get_backend_as_user, get_session_as_user } from "@/dao/call4server";
import { cookies } from "next/headers";


interface UserInfo {
  nick_name: string;
}

const getUserInfo = async (): Promise<UserInfo> => {
  let token = cookies().get("token_u")?.value;
  if(token == undefined){
    return Promise.resolve({nick_name:""});
  }
  const resp = await get_backend_as_user("/api/user/userinfo");
  if(resp.meta.status == true){
    return Promise.resolve(resp.data);
  }
  return Promise.resolve({nick_name:""});
};

const getRole = async () => {
  const sess = await get_session_as_user();
  if(sess == null){
    return Promise.resolve('');
  }
  if(sess.role != ''){
    return Promise.resolve(sess.role);
  }
  if(sess.role_option != undefined){
    return Promise.resolve(sess.role_option.role);
  }
  return Promise.resolve('');
};


export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userInfo = await getUserInfo();
  const role = await getRole();
  return (
    <Stack gap={5}>
      <div className="p-2">
        <AdminHeader userinfo={userInfo} role={role}/>
      </div>
      <div className="p-2">
        <Container>
          <Row>
            <Col>{children}</Col>
          </Row>
        </Container>
      </div>
    </Stack>
  );
}
