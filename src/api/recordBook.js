import { get } from "./base"

export const fetchRecordBooksAPI = async () => {
    const data = await get("/record_books");
return data;
}