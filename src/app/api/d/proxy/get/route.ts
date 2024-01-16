import { get_backend_as_cust } from "@/dao/call4server"
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const data = await get_backend_as_cust(url as string);
  return Response.json(data);
}

