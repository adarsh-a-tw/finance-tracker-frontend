import { _delete } from "./base"



export const deleteRecordAPI = async (recordBookId,recordId) => {
    return await _delete(`/record_books/${recordBookId}/records/${recordId}`);
}