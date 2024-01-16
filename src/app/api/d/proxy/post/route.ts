import { post_backend_as_cust } from "@/dao/call4server"
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const requestBody = await request.json();
  const data = await post_backend_as_cust(url as string, requestBody);
  return Response.json(data);
}

