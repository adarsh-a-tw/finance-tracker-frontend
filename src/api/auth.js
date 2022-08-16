import {postWithoutAuth} from "./base"

export const authAPI = async (username, password) => {
    const data = await postWithoutAuth("/users/authenticate", { username: username, password: password });
    return data;
}

export const refreshTokenAPI = async (refreshToken) => {
    const data = await postWithoutAuth("/users/refresh_token", { refresh_token: refreshToken });
    return data;
}
