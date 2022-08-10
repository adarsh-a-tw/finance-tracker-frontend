import postWithoutAuth from "./base"

const authAPI = async (username, password) => {
    const data = await postWithoutAuth("/users/authenticate", { username: username, password: password });

    return data.token;

}

export default authAPI;