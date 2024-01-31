import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

/**
 * /api/image/delete?url=
 * @param request 
 * @returns 
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        const urlToDelete = request.nextUrl.searchParams.get("url") as string;
        await del(urlToDelete);

        return Promise.resolve(NextResponse.json({
            status: "ok",
        }));
    } catch (error) {
        return Promise.resolve(NextResponse.json(
            {
                status: "error",
                message: (error as Error).message
            }
        ));
    }
}
