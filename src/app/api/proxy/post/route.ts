import { generateHeaders, post_backend, reset_token, try_refresh_token } from "@/dao/call4server"
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const requestBody = await request.json();
  const data = await post_backend(url as string, requestBody);
  // const ntoken = await try_refresh_token(data);
  // if(ntoken != null){
  //   cookies().set('token', ntoken, { secure: true });
  // }
  return Response.json(data);
}

