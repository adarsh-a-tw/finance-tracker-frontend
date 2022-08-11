import axios from "axios";
import alertStore from "../store/alertStore";


const postWithoutAuth = async (url, data) => {

    try {
        const post_url = BASE_URL + url;
        const response = await axios.post(post_url, data);
        return response.data;
    }
    catch (err) {
        let msg = err.response ? (err.response.data ? (err.response.data.message ? err.response.data.message : null) : null) : null;
        msg = msg ? msg : "Something went wrong";
        alertStore.setState({ type: 'error', message: msg, shouldAlertOpen: true });
        throw Error("API_ERROR");
    }
}

export default postWithoutAuth;
export const BASE_URL = "http://localhost:8000"; 