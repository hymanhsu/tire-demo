/**
 * 
 * 
 * 
 */

interface LooseObject {
    [key: string]: any
}

export const call_post = async (url:string, formData: any, auth:boolean) => {
    try {
        let headers:LooseObject = {
            "Content-Type": "application/json",
        };
        if(auth){
            const token = localStorage.getItem("token");
            headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`/api/proxy/post?url=${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in call_post() => ", error);
    }
};


export const call_get = async (url:string, auth:boolean) => {
    try {
        let headers:LooseObject = {
            "Content-Type": "application/json",
        };
        if(auth){
            const token = localStorage.getItem("token");
            headers.Authorization = `Bearer ${token}`;
        }
        const res = await fetch(`/api/proxy/get?url=${url}`, {
            method: "GET",
            headers: headers,
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error in call_get() => ", error);
    }
};

