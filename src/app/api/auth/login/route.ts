
export async function POST(
  request: Request
) {
  const requestBody = await request.json();
  console.log("requestBody=" + JSON.stringify(requestBody));

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  return Response.json(data);
}

