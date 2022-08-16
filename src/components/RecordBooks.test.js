import {  render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fetchRecordBooksAPI } from "../api/recordBook";

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

});