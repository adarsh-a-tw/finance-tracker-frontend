import axios from "axios";
import alertStore from "../store/alertStore";
import authStore from "../store/authStore";


export const postWithoutAuth = async (url, data) => {

    try {
        const postUrl = BASE_URL + url;
        const response = await axios.post(postUrl, data);
        return response.data;
    }
    catch (err) {
        let msg = err.response ? (err.response.data ? (err.response.data.message ? err.response.data.message : null) : null) : null;
        msg = msg ? msg : "Something went wrong";
        alertStore.setState({ type: 'error', message: msg, shouldAlertOpen: true });
        throw Error("API_ERROR");
    }
}

export const get = async (url) => {
    try {
        const getUrl = BASE_URL + url;
        const response = await axios.get(getUrl, { headers: { 'x-api-token': authStore.getState().token } });
        return response.data;
    }
    catch (err) {
        let msg = err.response ? (err.response.data ? (err.response.data.message ? err.response.data.message : null) : null) : null;
        msg = msg ? msg : "Something went wrong";
        alertStore.setState({ type: 'error', message: msg, shouldAlertOpen: true });
        throw Error("API_ERROR");
    }
}

export const post = async (url, data) => {
    try {
        const postUrl = BASE_URL + url;
        const response = await axios.post(postUrl, data,{ headers: { 'x-api-token': authStore.getState().token } });
        return response.data;
    }
    catch (err) {
        let msg = err.response ? (err.response.data ? (err.response.data.message ? err.response.data.message : null) : null) : null;
        msg = msg ? msg : "Something went wrong";
        alertStore.setState({ type: 'error', message: msg, shouldAlertOpen: true });
        throw Error("API_ERROR");
    }
}

export const _delete = async (url) => {
    try {
        const deleteUrl = BASE_URL + url;
        await axios.delete(deleteUrl, { headers: { 'x-api-token': authStore.getState().token } });
    }
    catch (err) {
        let msg = err.response ? (err.response.data ? (err.response.data.message ? err.response.data.message : null) : null) : null;
        msg = msg ? msg : "Something went wrong";
        alertStore.setState({ type: 'error', message: msg, shouldAlertOpen: true });
        throw Error("API_ERROR");
    }
}

export const BASE_URL = "http://localhost:8000"; 