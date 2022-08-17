import { get, _delete, post } from "./base"

export const fetchRecordBooksAPI = async () => {
    return await get("/record_books");
}

export const fetchRecordBookDetailAPI = async (recordBookId) => {
    return await get(`/record_books/${recordBookId}`);
}

export const deleteRecordBookAPI = async (recordBookId) => {
    return await _delete(`/record_books/${recordBookId}`);
}

export const createRecordBookAPI = async (name) => {
    return await post("/record_books", { "name": name });
}