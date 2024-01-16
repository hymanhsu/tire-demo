"use server";

import { generateUserHeaders } from "@/dao/call4server"
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest
) {

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/logout`, {
    method: "GET",
    headers: generateUserHeaders(),
    cache: "no-cache",
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  if(data.meta.status == true){
    // save token into cookie
    cookies().delete("token_u");
  }

  return Response.json(data);
}

