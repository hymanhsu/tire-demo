import { generateHeaders } from "@/app/api/utils"
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
    method: "GET",
    headers: generateHeaders(),
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  return Response.json(data);
}

