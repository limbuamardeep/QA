import { expect } from "@playwright/test";
import { LoginPage } from "../page_object/login.po.js"; 
import { ContactPage } from "../page_object/contact.po.js";
import { test } from "@playwright/test";
import module from "module";

let apiUrl;

export async function authenticateUser(username, password, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
    };
    const requestBody = {
        email: username,
        password: password,
    };
    const response = await request.post(`${apiUrl}/users/login`, {
        data: requestBody,
        headers,
    });
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const token = responseBody.token;
    return token;
}

async function getApiBaseUrl() {
    apiUrl = process.env.API_BASE_URL;
    if (!apiUrl) {
        apiUrl = "https://thinking-tester-contact-list.herokuapp.com";
    }
    return apiUrl;
}

export async function createEntity(userdata, accessToken, module, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
    };
    const response = await request.post(apiUrl+module, {
        headers,
        data: JSON.stringify(userdata),
    });
    const responseBody = await response.json();
    const statusCode = response.status();
    expect(statusCode).toBe(201);
    if (responseBody && responseBody._id) {
        return responseBody._id;
    } else {
        return null;
    }
}
module.exports = {
    authenticateUser,
    createEntity,
    getEntity,
    deleteEntity,
    validateEntity
};
async function getEntity(accessToken, module, status, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken,
    };
    const response = await request.get(apiUrl+module, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
    const responseBody = await response.json();
    if (responseBody && responseBody._id) {
        return responseBody._id;
    }else{
        return null;
    }
}
async function deleteEntity(accessToken, module, id, { request }) {
    const apiUrl = await getApiBaseUrl();
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + accessToken,
    };
    const response = await request.delete(`${apiUrl}${module}/${id}`, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(204);
}
async function validateEntity (acceptToken, module,status,{request}) {
    const apiUrl=await getApiBaseUrl();
    const headers={
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "Bearer " + acceptToken,
    };
    const response = await request.get(`${apiUrl}${module}`, {
        headers,
    });
    const statusCode = response.status();
    expect(statusCode).toBe(parseInt(status));
}