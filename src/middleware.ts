import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { generateCustHeaders, generateUserHeaders } from './dao/call4server';


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
    // if(request.nextUrl.pathname.startsWith("/d/")){
    //     return fileterForCustumer(request);
    // }
    // if(request.nextUrl.pathname.startsWith("/admin/")){
    //     return fileterForUser(request);
    // }
    return NextResponse.next();
}


export async function fileterForCustumer(request: NextRequest) {
    const response = NextResponse.next();
    if(judgeExclude(request.nextUrl.pathname, ["/d/auth/login"])){
        return response;
    }
    let token: string | undefined = request.cookies.get('token')?.value;
    // check cookie
    const cookieStore = cookies();
    if (token != undefined) {
        //refresh token
        const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/check`, {
            method: "POST",
            headers: generateCustHeaders(),
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


export async function fileterForUser(request: NextRequest) {
    const response = NextResponse.next();
    if(judgeExclude(request.nextUrl.pathname, ["/admin/auth/login"])){
        return response;
    }
    let token: string | undefined = request.cookies.get('token_u')?.value;
    // check cookie
    const cookieStore = cookies();
    if (token != undefined) {
        //refresh token
        const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/check`, {
            method: "POST",
            headers: generateUserHeaders(),
            body: JSON.stringify({
                token: token as string,
                update: false
            }),
        });
        const data = await res.json();
        if (data.meta.status == false) {
            // clear token in the cookie if token is too old or invalid
            console.log("response.cookies.clear token ");
            response.cookies.delete('token_u');
        }
        if (data.meta.status == true && data.data.new_token != "") {
            // update token into the cookie if previous token expired in 3 days
            const ntoken = data.data.new_token;
            console.log("response.cookies.set token ... "+ntoken.substr(ntoken.length - 300));
            response.cookies.set({
                name: 'token_u',
                value: ntoken,
                path: '/',
            });
        }
        return response;
    }else{
        // not login yet
        return NextResponse.redirect(new URL('/admin/auth/login', request.url))
    }
}
