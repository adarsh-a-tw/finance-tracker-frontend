import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fetchRecordBookDetailAPI } from "../api/recordBook";
import { deleteRecordAPI } from "../api/record";

import RecordBookDetailView from "./RecordBookDetailView";

jest.mock("../api/recordBook");
jest.mock("../api/record");

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 'c636830c-e860-4e85-9d3f-6a042cf13de1',
    }),
}));

const deleteFn = jest.fn();

describe("RecordBookDetailView component tests", () => {

    it("Should display record book details", async () => {

        const recordBook = {
            "id": "c636830c-e860-4e85-9d3f-6a042cf13de1",
            "name": "Record_Book_Name",
            "net_balance": -10.0,
            "tags": [
                "test_tag_2",
                "test_tag_1"
            ],
            "records": [
                {
                    "id": "c7e0b038-ede3-4a85-90c5-ecb7e58d87ea",
                    "note": "Tag Test",
                    "amount": 10.0,
                    "type": "EXPENSE",
                    "added_at": "2022-08-08T12:03:38.347667",
                    "tags": [
                        "test_tag_2",
                        "test_tag_1"
                    ]
                }
            ]
        };

        fetchRecordBookDetailAPI.mockResolvedValue(recordBook);

        const { getAllByTestId, getByText } = render(<RecordBookDetailView id={recordBook.id} />, { wrapper: BrowserRouter });

        expect(fetchRecordBookDetailAPI).toBeCalledTimes(1);
        expect(fetchRecordBookDetailAPI).toBeCalledWith("c636830c-e860-4e85-9d3f-6a042cf13de1");


        await waitFor(() => { expect(getByText('Record_Book_Name')).toBeDefined() });
        expect(getByText(/-10.00/)).toBeDefined();
        expect(getAllByTestId('record').length).toBe(1);
    });

    it("Should delete a record", async () => {

        const recordBook = {
            "id": "c636830c-e860-4e85-9d3f-6a042cf13de1",
            "name": "Record_Book_Name",
            "net_balance": -10.0,
            "tags": [
                "test_tag_2",
                "test_tag_1"
            ],
            "records": [
                {
                    "id": "c7e0b038-ede3-4a85-90c5-ecb7e58d87ea",
                    "note": "Tag Test",
                    "amount": 10.0,
                    "type": "EXPENSE",
                    "added_at": "2022-08-08T12:03:38.347667",
                    "tags": [
                        "test_tag_2",
                        "test_tag_1"
                    ]
                }
            ]
        };

        const recordBookAfterDelete = {
            "id": "c636830c-e860-4e85-9d3f-6a042cf13de1",
            "name": "Record_Book_Name",
            "net_balance": -10.0,
            "tags": [
                "test_tag_2",
                "test_tag_1"
            ],
            "records": []
        }

        fetchRecordBookDetailAPI.mockResolvedValueOnce(recordBook).mockResolvedValue(recordBookAfterDelete);


        const { queryAllByTestId, getByText, getByTestId } = render(<RecordBookDetailView id={recordBook.id} />, { wrapper: BrowserRouter });
        await waitFor(() => { fireEvent.click(getByText("Delete")) });
        await waitFor(() => { fireEvent.click(getByTestId("delete-btn")) });

        expect(fetchRecordBookDetailAPI).toBeCalledTimes(2);
        expect(fetchRecordBookDetailAPI).toBeCalledWith("c636830c-e860-4e85-9d3f-6a042cf13de1");

        expect(deleteRecordAPI).toBeCalledWith("c636830c-e860-4e85-9d3f-6a042cf13de1", 'c7e0b038-ede3-4a85-90c5-ecb7e58d87ea');
        await waitFor(() => { expect(queryAllByTestId('record').length).toBe(0); });
    });

});