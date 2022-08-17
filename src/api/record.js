import { _delete, post } from "./base"



export const deleteRecordAPI = async (recordBookId, recordId) => {
    return await _delete(`/record_books/${recordBookId}/records/${recordId}`);
}

export const createRecordAPI = async (recordBookId, note, amount, type, tags) => {
    return await post(`/record_books/${recordBookId}/records`, { note: note, amount: amount, type: type, tags: tags });
}