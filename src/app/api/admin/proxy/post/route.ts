import { post_backend_as_user } from "@/dao/call4server"
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const requestBody = await request.json();
  const data = await post_backend_as_user(url as string, requestBody);
  return Response.json(data);
}

