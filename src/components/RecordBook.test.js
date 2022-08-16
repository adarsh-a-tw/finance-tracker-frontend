import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { fetchRecordBooksAPI } from "../api/recordBook";

import RecordBook from "./RecordBook";


describe("RecordBook component tests", () => {

    it("Should display name and netBalance", () => {

        let id = 'uuid-1';
        let name = 'sample-1';
        let netBalance = 10.0;


        const { getByText } = render(<RecordBook key={0} id={id} name={name} netBalance={netBalance} />, { wrapper: BrowserRouter });

        expect(getByText(name)).toBeDefined();
        expect(getByText(/10.0/)).toBeDefined();
    });

});