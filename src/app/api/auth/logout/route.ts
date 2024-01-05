import { generateHeaders } from "@/app/api/utils"

export async function GET(
  request: Request
) {

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/logout`, {
    method: "GET",
    headers: generateHeaders(request),
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  return Response.json(data);
}

