"use server";

import { generateHeaders } from "@/app/api/utils"
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest
) {

  const requestBody = await request.json();

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: generateHeaders(request),
    body: JSON.stringify(requestBody),
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  if(data.meta.status == true){
    cookies().set('token', data.data.token, { secure: true })
  }

  return Response.json(data);
}

