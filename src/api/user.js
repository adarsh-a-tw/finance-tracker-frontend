import { postWithoutAuth } from "./base"

export const createUserAPI = async (username, email, password, confirmPassword) => {
    const data = await postWithoutAuth("/users/signup", { username: username, email: email, confirm_password: confirmPassword, password: password });
    return data;
}