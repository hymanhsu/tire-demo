import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

/**
 * /api/image/delete?url=
 * @param request 
 * @returns 
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const urlToDelete = searchParams.get('url') as string;
    await del(urlToDelete);
   
    return new Response();
}
