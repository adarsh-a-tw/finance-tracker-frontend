import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fetchRecordBooksAPI, deleteRecordBookAPI } from "../api/recordBook";

import RecordBooks from "./RecordBooks";


jest.mock("../api/recordBook");

describe("RecordBooks component tests", () => {

    it("Should display list of record books", async () => {

        const recordBooks = [
            { id: 'uuid-1', name: 'sample-1', net_balance: 10.00 },
            { id: 'uuid-2', name: 'sample-2', net_balance: 5.00 }
        ];
        fetchRecordBooksAPI.mockResolvedValue(recordBooks);

        const { getAllByTestId } = render(<RecordBooks />, { wrapper: BrowserRouter });

        expect(fetchRecordBooksAPI).toBeCalledTimes(1);
        await waitFor(() => { expect(getAllByTestId('record-book-item').length).toBe(2) });
    });

    it("Should delete a record book", async () => {

        const recordBooks = [
            { id: 'uuid-1', name: 'sample-1', net_balance: 10.00 }
        ];
        fetchRecordBooksAPI.mockResolvedValueOnce(recordBooks).mockResolvedValue([]);

        const { getByText, queryAllByTestId, getByTestId } = render(<RecordBooks />, { wrapper: BrowserRouter });
        await waitFor(() => { fireEvent.click(getByText("Delete")) });
        await waitFor(() => { fireEvent.click(getByTestId("delete-btn")) });
        expect(deleteRecordBookAPI).toBeCalledWith('uuid-1');
        await waitFor(() => { expect(queryAllByTestId('record-book-item').length).toBe(0) });
    });

});