import { config } from "./config.js";
const { SERVER_API } = config;

export const interactAPI = {
    send: async function (url, method = "GET", body = null) {
        const request = {
            method: method,
            headers: {
                "Content-Type": "application-json",
            },
        }

        if (body) request.body = JSON.stringify(body);

        const response = await fetch(`${SERVER_API}${url}`, request);
        const data = await response.json();

        return {
            response: response,
            data: data
        };
    },

    get: function (url) {
        return this.send(url);
    }
}