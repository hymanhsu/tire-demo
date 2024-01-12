/**
 * Call the proxy entry on the frontend server, which is responsible to call the backend server
 */
"use server";

// import { RequestContext } from "next/dist/server/base-server";
import { headers, cookies } from 'next/headers';

export const post_backend = async (url: string, formData: any) => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "POST",
        headers: generateHeaders(),
        body: JSON.stringify(formData),
    })
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const get_backend = async (url: string) => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "GET",
        headers: generateHeaders(),
    })
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const try_refresh_token = async (respData:any):Promise<string|null> => {
    'use server'
    if(respData.meta.status == false && respData.meta.message == "Current user have not login!"){
        // check cookie
        const cookieStore = cookies();
        let token = cookieStore.get("token")?.value;
        if(token != undefined){
            //refresh token
            const res = await fetch(`${process.env.BACKEND_API_BASE_URL}/api/auth/check`, {
                method: "POST",
                headers: generateHeaders(),
                body: JSON.stringify({
                    token: token as string,
                    update: true
                }),
            });
            const data = await res.json();
            if (data.meta.status == true) {
                // save token into cookie
                // reset_token(data.data.new_token);
                return Promise.resolve(data.data.new_token);
            }
        }
    }
    return Promise.resolve(null);
}


export async function reset_token(token:string) {
    cookies().set('token', token, { secure: true });
}


export const generateHeaders = () : Headers => {
    const headersList = headers();
    const cookieStore = cookies();
    // let auth: string | null = headersList.get("Authorization");
    // if(auth == null && cookieStore.has("token")){
    //     auth = cookieStore.get("token")?.value as string;
    // }
    let auth = cookieStore.get("token")?.value;
    const userAgent: string | null = headersList.get("User-Agent");
    if (auth == undefined) {
        // console.log("not found Authorization");
        return new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": userAgent as string,
        });
    } else {
        // console.log("found Authorization");
        return new Headers({
            "Accept": "application/json",
            "Content-Type": "application/json",
            "User-Agent": userAgent as string,
            "Authorization": "Bearer "+(auth as string),
        });
    }
}