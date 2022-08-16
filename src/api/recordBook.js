import { get } from "./base"

export const fetchRecordBooksAPI = async () => {
    return await get("/record_books");
}

export const fetchRecordBookDetailAPI = async (recordBookId) => {
    return await get(`/record_books/${recordBookId}`);
}