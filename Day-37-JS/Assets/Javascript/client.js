import { config } from "./config.js";


const { SERVER_API } = config;


export const client = {
    token: null,

    setToken: function (token) {
        this.token = token;
    },

    send: async function (url, method = "GET", body = null) {
        url = `${SERVER_API}${url}`;
        const headers = {
            "Content-Type": "application/json",
        };

        if (this.token) headers.Authorization = `Bearer ${this.token}`;

        const option = {
            method: method,
            headers: headers,
        }

        if (body) option.body = JSON.stringify(body);

        const response = await fetch(url, option);
        const data = await response.json();
        return { response: response, data: data };
    },

    get: function (url) {
        return this.send(url);
    },

    post: function (url, body) {
        return this.send(url, "POST", body);
    },

    put: function (url, body) {
        return this.send(url, "PUT", body);
    },

    patch: function (url, body) {
        return this.send(url, "PATCH", body);
    },

    delete: function (url) {
        return this.send(url, "DELETE");
    }
}