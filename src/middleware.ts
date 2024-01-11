import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateHeaders } from './dao/call4server';


function judgeExclude(path: string, exludes: string[]): boolean {
    for (let item of exludes) {
        if (path.startsWith(item)) {
            return true;
        }
    }
    return false;
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    if (judgeExclude(request.nextUrl.pathname, ['/_next/','/api/auth/login'])) {
        return NextResponse.next()
    }
    let token: string | undefined = request.cookies.get('token')?.value;
    // check cookie
    const cookieStore = cookies();
    if (token != undefined) {
        //refresh token
        const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/check`, {
            method: "POST",
            headers: generateHeaders(),
            body: JSON.stringify({
                token: token as string,
                update: false
            }),
        });
        const data = await res.json();
        if (data.meta.status == true && data.data.new_token != "") {
            // save token into cookie
            // reset_token(data.data.new_token);
            const ntoken = data.data.new_token;
            const response = NextResponse.next();
            console.log("response.cookies.set ... "+ntoken.substr(ntoken.length - 300));
            response.cookies.set({
                name: 'token',
                value: ntoken,
                path: '/',
            });
            return response;
        }
    }
}

