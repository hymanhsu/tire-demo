
export async function GET(
  request: Request
) {
  const auth = request.headers.get("Authorization");

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/user/userinfo`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": auth as string,
    },
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  return Response.json(data);
}

