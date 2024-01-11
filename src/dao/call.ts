/**
 * Call the proxy entry on the frontend server, which is responsible to call the backend server
 */
"use client";

interface LooseObject {
    [key: string]: any
}

export const call_post = async (url:string, formData: any) => {
    try {
        let headers:LooseObject = {
            "Content-Type": "application/json",
        };
        // if(auth){
        //     const token = localStorage.getItem("token");
        //     headers.Authorization = `Bearer ${token}`;
        // }
        const res = await fetch(`/api/proxy/post?url=${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
        });
        const respData = await res.json();
        if(respData.meta.status == false && respData.meta.message == "Current user have not login!"){
            // token have been expired, need to login again
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userinfo");
            window.location.href = "/d/auth/login";
        }
        return respData;
    } catch (error: any) {
        console.log("error in call_post() => ", error);
    }
};


export const call_get = async (url:string) => {
    try {
        let headers:LooseObject = {
            "Content-Type": "application/json",
        };
        // if(auth){
        //     const token = localStorage.getItem("token");
        //     headers.Authorization = `Bearer ${token}`;
        // }
        const res = await fetch(`/api/proxy/get?url=${url}`, {
            method: "GET",
            headers: headers,
        });
        const respData = await res.json();
        if(respData.meta.status == false && respData.meta.message == "Current user have not login!"){
            // token have been expired, need to login again
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("userinfo");
            window.location.href = "/d/auth/login";
        }
        return respData;
    } catch (error: any) {
        console.log("error in call_get() => ", error);
        if(error.message == 'Current user have not login!'){
            window.location.href = "/d/auth/login";
        }
    }
};

