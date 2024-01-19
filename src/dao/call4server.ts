/**
 * Call the proxy entry on the frontend server, which is responsible to call the backend server
 */
"use server";

// import { RequestContext } from "next/dist/server/base-server";
import { headers, cookies } from 'next/headers';


export const post_backend_as_cust = async (url: string, formData: any): Promise<any> => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "POST",
        headers: generateCustHeaders(),
        body: JSON.stringify(formData),
        cache: "no-cache",
    });
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const get_backend_as_cust = async (url: string): Promise<any> => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "GET",
        headers: generateCustHeaders(),
        cache: "no-cache",
    })
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const post_backend_as_user = async (url: string, formData: any): Promise<any> => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "POST",
        headers: generateUserHeaders(),
        body: JSON.stringify(formData),
        cache: "no-cache",
    })
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const get_backend_as_user = async (url: string): Promise<any> => {
    // *******  invoke backend server start ******* 
    const res = await fetch(`${process.env.BACKEND_API_BASE_URL}${url}`, {
        method: "GET",
        headers: generateUserHeaders(),
        cache: "no-cache",
    })
    const data = await res.json();
    // *******  invoke backend server end ******* 
    return data;
};


export const generateCustHeaders = (): Headers => {
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
            "Authorization": "Bearer " + (auth as string),
        });
    }
}


export const generateUserHeaders = (): Headers => {
    const headersList = headers();
    const cookieStore = cookies();
    // let auth: string | null = headersList.get("Authorization");
    // if(auth == null && cookieStore.has("token")){
    //     auth = cookieStore.get("token")?.value as string;
    // }
    let auth = cookieStore.get("token_u")?.value;
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
            "Authorization": "Bearer " + (auth as string),
        });
    }
}


export const get_session_as_cust = async (): Promise<any> => {
    let token: string | undefined = cookies().get('token')?.value;
    if (token == undefined) {
        return Promise.resolve(null);
    }
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
        return Promise.resolve(null);
    }
    return Promise.resolve(data.data.session);
}


export const get_session_as_user = async (): Promise<any> => {
    let token: string | undefined = cookies().get('token_u')?.value;
    if (token == undefined) {
        return Promise.resolve(null);
    }
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
        return Promise.resolve(null);
    }
    return Promise.resolve(data.data.session);
}


