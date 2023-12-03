import axios from "axios";
import axiosRetry from "axios-retry";
import { API_URL, API_PREFIX } from "../config";
import { get } from 'lodash';

export const axiosInstance = axios.create({ baseURL: `${API_URL}${API_PREFIX}` });

axiosRetry(axiosInstance, {
    retryDelay: (retryCount) => {
        return retryCount * 1500;
    },
});

export const Authorization = (token) => {
    const jwtToken = token || localStorage.getItem('token') || '';
    const userId = localStorage.getItem('userId') || '';

    if (jwtToken) {
        if (isExpired(jwtToken)) {
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            return {
                status: false,
                payload: {},
            }
        } else {
            const payload = jwtToken.split('.')[1];
            try {
                const tokenInfo = JSON.parse(window.atob(payload));
                return {
                    status: true,
                    payload: tokenInfo,
                    userId: userId,
                }
            } catch (err) {
                return {
                    status: false
                }
            }
        }
    }
    else {
        return {
            status: false
        }
    }
}

const isExpired = (jwtToken) => {
    try {
        if (jwtToken === '' || jwtToken === undefined || jwtToken === "undefined")
            return true;
        const payload = jwtToken.split('.')[1];
        const tokenInfo = JSON.parse(window.atob(payload));
        const currentTime = Math.round((new Date()).getTime() / 1000);
        const expirationTime = tokenInfo.exp;
        return expirationTime < currentTime;
    }
    catch (err) {
        return false
    }
}
