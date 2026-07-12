import axios from 'axios'

import { baseApiUrl } from "src/global.js";

async function refreshToken(error) {
    return new Promise((resolve, reject) => {
        try {
            const refresh_token = localStorage.getItem("refresh_token");

            if (!refresh_token) {
                return resolve(false)
            }

            const body = {
                token: refresh_token
            }

            axios
                .post(
                    baseApiUrl + "/refreshToken",
                    body
                )
                .then(async (res) => {
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("refresh_token", res.data.refresh_token);

                    return resolve(res);
                })
                .catch((err) => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("refresh_token");

                    return reject(err);
                });
        } catch (err) {
            return reject(err);
        }
    });
};

export {
    refreshToken
}