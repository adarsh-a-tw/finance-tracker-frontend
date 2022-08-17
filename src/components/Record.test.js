import { fireEvent, render } from "@testing-library/react";
import Record from "./Record";

const deleteFn = jest.fn();

describe("Record component tests", () => {

    it("Should display record details", async () => {

        const record = {
            id: "c7e0b038-ede3-4a85-90c5-ecb7e58d87ea",
            note: "Tag Test",
            amount: 10.0,
            type: "EXPENSE",
            added_at: "2022-08-08T12:03:38.347667",
            tags: [
                "test_tag_2",
                "test_tag_1"
            ]
        };



        const { getByText } = render(
            <Record id={record.id} note={record.note} amount={record.amount} type={record.type} addedAt={record.added_at} tags={record.tags} deleteFn={deleteFn} />
        );

        expect(getByText(record.note)).toBeDefined();
        expect(getByText(/10.00/)).toBeDefined();
        expect(getByText(/EXPENSE/)).toBeDefined();
        expect(getByText("Added at : August 8th 2022, 12:03:38 pm")).toBeDefined();
        expect(getByText("test_tag_2")).toBeDefined();
        expect(getByText("test_tag_1")).toBeDefined();

    });

    it("Should call delete func when delete button is clicked", () => {

        const record = {
            id: "c7e0b038-ede3-4a85-90c5-ecb7e58d87ea",
            note: "Tag Test",
            amount: 10.0,
            type: "EXPENSE",
            added_at: "2022-08-08T12:03:38.347667",
            tags: [
                "test_tag_2",
                "test_tag_1"
            ]
        };

        const { getByText } = render(
            <Record id={record.id} note={record.note} amount={record.amount} type={record.type} addedAt={record.added_at} tags={record.tags} deleteFn={deleteFn} />
        );

        fireEvent.click(getByText("Delete"));

        expect(deleteFn).toHaveBeenCalledWith(record.id);
    })

});