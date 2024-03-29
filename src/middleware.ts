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
    // console.log("path = "+request.nextUrl.pathname);
    if (request.nextUrl.pathname.startsWith("/w/")) {
        return fileterForCustumer(request);
    }
    if (request.nextUrl.pathname.startsWith("/m/")) {
        return fileterForUser(request);
    }
    return NextResponse.next();
}


export async function fileterForCustumer(request: NextRequest) {
    if (judgeExclude(request.nextUrl.pathname, 
        ["/w/auth/login", "/w/auth/signup", "/w/api/setCookie",
        "/w/api/auth/login", "/w/api/auth/logout"])) {
        return NextResponse.next();
    }
    let token: string | undefined = request.cookies.get('token')?.value;
    // check cookie
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
            const response = NextResponse.redirect(new URL('/w/auth/login', request.url));
            response.cookies.delete('token');
            return response;
        }
        if (data.meta.status == true && data.data.new_token != "") {
            // update token into the cookie if previous token expired in 3 days
            const ntoken = data.data.new_token;
            console.log("response.cookies.set token ... " + ntoken.substr(ntoken.length - 300));
            const response = NextResponse.redirect(new URL('/w/', request.url));
            response.cookies.set({
                name: 'token',
                value: ntoken,
                path: '/',
            });
            return response;
        }
    }else{
        return NextResponse.redirect(new URL('/w/auth/login', request.url));
    }
    return NextResponse.next();
}


export async function fileterForUser(request: NextRequest) {
    console.log("fileterForUser()");
    if (judgeExclude(request.nextUrl.pathname, 
        ["/m/auth/login", "/m/api/auth/loginAsUser", 
        "/m/api/auth/loginProceedAsUser", "/m/api/auth/logoutAsUser"])) {
        console.log("ignored");
        return NextResponse.next();
    }
    let token: string | undefined = request.cookies.get('token_u')?.value;
    // check cookie
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
            console.log("response.cookies.clear token_u ");
            const response = NextResponse.redirect(new URL('/m/auth/login', request.url));
            response.cookies.delete('token_u');
            return response;
        }
        if (data.meta.status == true && data.data.new_token != "") {
            // update token into the cookie if previous token expired in 3 days
            const ntoken = data.data.new_token;
            console.log("response.cookies.set token_u ... " + ntoken.substr(ntoken.length - 300));
            const response = NextResponse.redirect(new URL('/m/', request.url));
            response.cookies.set({
                name: 'token_u',
                value: ntoken,
                path: '/',
            });
            return response;
        }
    }else{
        return NextResponse.redirect(new URL('/m/auth/login', request.url));
    }
    return NextResponse.next();
}
