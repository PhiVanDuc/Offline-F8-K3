import { config } from "./config.js";


const { SERVER_API } = config;


export const fetchApi = {
    send: async function (url, method = "GET", body = null) {
        const request = {
            method,
            headers: {
                "Content-Type": "application/json",
            }
        }

        if (body) {
            request.body = body;
        }

        const response = await fetch(`${SERVER_API}${url}`, request);
        const data = await response.json();

        return { response, data };
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