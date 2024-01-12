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
    const response = NextResponse.next();
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
        if (data.meta.status == false) {
            // clear token in the cookie if token is too old or invalid
            console.log("response.cookies.clear token ");
            response.cookies.delete('token');
        }
        if (data.meta.status == true && data.data.new_token != "") {
            // update token into the cookie if previous token expired in 3 days
            const ntoken = data.data.new_token;
            console.log("response.cookies.set token ... "+ntoken.substr(ntoken.length - 300));
            response.cookies.set({
                name: 'token',
                value: ntoken,
                path: '/',
            });
        }
    }
    return response;
}

