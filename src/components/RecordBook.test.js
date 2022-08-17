import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import RecordBook from "./RecordBook";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const deleteFn = jest.fn();

describe("RecordBook component tests", () => {

    it("Should display name and netBalance", () => {

        let id = 'uuid-1';
        let name = 'sample-1';
        let netBalance = 10.0;


        const { getByText } = render(<RecordBook key={0} id={id} name={name} netBalance={netBalance} deleteFn={deleteFn} />, { wrapper: BrowserRouter });

        expect(getByText(name)).toBeDefined();
        expect(getByText(/10.0/)).toBeDefined();
    });

    it("Should navigate to detail view on clicking view button", () => {

        let id = 'uuid-1';
        let name = 'sample-1';
        let netBalance = 10.0;


        const { getByText } = render(<RecordBook key={0} id={id} name={name} netBalance={netBalance} deleteFn={deleteFn} />, { wrapper: BrowserRouter });

        fireEvent.click(getByText(/view/i));


        expect(mockedUsedNavigate).toBeCalledWith('/record_books/uuid-1');
    });

    it("Should call delete func when delete button is clicked", () => {

        let id = 'uuid-1';
        let name = 'sample-1';
        let netBalance = 10.0;

        const { getByText } = render(<RecordBook key={0} id={id} name={name} netBalance={netBalance} deleteFn={deleteFn} />, { wrapper: BrowserRouter })

        fireEvent.click(getByText("Delete"));

        expect(deleteFn).toHaveBeenCalledWith(id);
    })

});