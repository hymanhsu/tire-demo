import { generateHeaders } from "@/app/api/utils"
import { NextRequest } from "next/server";

export async function POST(
  request: NextRequest
) {
  const url = request.nextUrl.searchParams.get("url");
  const requestBody = await request.json();

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
    method: "POST",
    headers: generateHeaders(request),
    body: JSON.stringify(requestBody),
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  return Response.json(data);
}

