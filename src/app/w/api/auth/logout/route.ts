"use server";

import { generateCustHeaders } from "@/dao/call4server"
import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest
) {

  // *******  invoke backend server start ******* 
  const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/logout`, {
    method: "GET",
    headers: generateCustHeaders(),
    cache: "no-cache",
  })
  const data = await res.json();
  // *******  invoke backend server end ******* 

  if(data.meta.status == true){
    // save token into cookie
    cookies().delete("token");
  }

  return Response.json(data);
}

