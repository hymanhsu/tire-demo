import { generateHeaders, get_backend, reset_token, try_refresh_token,  } from "@/dao/call4server"
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const data = await get_backend(url as string);
  // const ntoken = await try_refresh_token(data);
  // if(ntoken != null){
  //   cookies().set('token', ntoken, { secure: true });
  // }
  return Response.json(data);
}

