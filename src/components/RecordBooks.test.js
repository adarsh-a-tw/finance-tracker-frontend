import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { fetchRecordBooksAPI, deleteRecordBookAPI, createRecordBookAPI } from "../api/recordBook";

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

    it("Should create a record book", async () => {

        const name = "My New Record Book";

        const recordBooks = [
            { id: 'uuid-1', name: "My New Record Book", net_balance: 0.00 }
        ];

        fetchRecordBooksAPI.mockResolvedValueOnce([]).mockResolvedValue(recordBooks);

        const { queryAllByTestId, getByTestId, getByText } = render(<RecordBooks />, { wrapper: BrowserRouter });
        expect(fetchRecordBooksAPI).toBeCalledTimes(1);
        
        fireEvent.click(getByTestId("plus-btn"));
        userEvent.type(getByTestId("name-box"), name);
        fireEvent.click(getByTestId("create-confirm-btn"));
        expect(fetchRecordBooksAPI).toBeCalledTimes(1);
        expect(createRecordBookAPI).toBeCalledWith(name);
        await waitFor(() => { expect(queryAllByTestId('record-book-item').length).toBe(1) });
        await waitFor(() => { expect(getByText(name)).toBeDefined() });
    });

});