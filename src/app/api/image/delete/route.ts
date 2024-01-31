import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

/**
 * /api/image/delete?url=
 * @param request 
 * @returns 
 */
export async function POST(request: Request): Promise<NextResponse> {

    try {
        const { searchParams } = new URL(request.url);
        const urlToDelete = searchParams.get('url') as string;
        await del(urlToDelete);
        
        return NextResponse.json({
            status : "ok",
        });
    } catch (error) {
        return NextResponse.json(
            { 
                status: "error" ,
                message: (error as Error).message
            }
        );
    }
}
