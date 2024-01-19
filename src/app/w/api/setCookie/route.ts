"use server";

import { NextRequest } from "next/server";
import { cookies } from 'next/headers';

export async function POST(
  request: NextRequest
) {

  const requestBody = await request.json();
  const cookieKey = requestBody.key;
  const cookieValue = requestBody.value;

  if (cookieValue == "") {
    if (cookies().has(cookieKey)) {
      cookies().delete(cookieKey);
    }
  } else {
    cookies().set({
      name: cookieKey,
      value: cookieValue,
      httpOnly: true,
      path: '/',
    });
  }

  return Response.json({
    meta: {
      status: true,
      message: "ok"
    }
  });
}

