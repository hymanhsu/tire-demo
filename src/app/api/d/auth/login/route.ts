"use server";

import { generateCustHeaders } from "@/dao/call4server"
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest
) {

  const requestBody = await request.json();

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: generateCustHeaders(),
    body: JSON.stringify(requestBody),
    cache: "no-cache",
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  if(data.meta.status == true){
    // save token into cookie
    cookies().set({
      name: 'token',
      value: data.data.token,
      httpOnly: true,
      path: '/',
    });
  }

  return Response.json(data);
}

