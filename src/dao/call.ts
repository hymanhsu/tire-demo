/**
 * Call the proxy entry on the frontend server, which is responsible to call the backend server
 */
"use client";

export interface LooseObject {
    [key: string]: any
}

export const call_post_as_cust = (url: string, formData: any) => {
    return fetch(`/d/api/proxy/post?url=${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json());
};


export const call_get_as_cust = (url: string) => {
    return fetch(`/d/api/proxy/get?url=${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json());
};


export const call_post_as_user = (url: string, formData: any) => {
    return fetch(`/admin/api/proxy/post?url=${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json());
};


export const call_get_as_user = (url: string) => {
    return fetch(`/admin/api/proxy/get?url=${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    .then(response => response.json());
};
