import { cleanup, fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";
import axios from 'axios';


import { BASE_URL } from "../api/base";
import { act } from "react-dom/test-utils";
import alertStore from "../store/alertStore";
import userEvent from "@testing-library/user-event";



jest.mock("axios");



describe("Signup component tests", () => {

    afterEach(() => {
        cleanup();
    });


    it("Should display signup form", () => {

        const { getByLabelText, getByTestId, getByRole, getByText } = render(<Signup />, { wrapper: BrowserRouter });

        expect(getByLabelText(/username/i)).toBeDefined();
        expect(getByLabelText(/email/i)).toBeDefined();
        expect(getByTestId("password")).toBeDefined();
        expect(getByTestId("confirm_password")).toBeDefined();
        expect(getByRole('button')).toHaveTextContent(/submit/i);
        expect(getByText("Already have an account ? Login")).toBeDefined();
    });

    it("Should submit form successfully", async () => {
        const { getByLabelText, getByTestId, getByRole } = render(<Signup />, { wrapper: BrowserRouter });


        axios.post.mockImplementation(() => Promise.resolve({ status: 201, response: { data: {} } }));


        await act(async () => {
            fireEvent.change(getByLabelText(/username/i), { target: { value: 'test_username' } })
        });
        await act(async () => {
            fireEvent.change(getByLabelText(/email/i), { target: { value: 'testemail@domain.com' } })
        });
        await act(async () => {
            fireEvent.change(getByTestId("password"), { target: { value: 'StrongP@ssword123' } })
        });
        await act(async () => {
            fireEvent.change(getByTestId("confirm_password"), { target: { value: 'StrongP@ssword123' } })
        });

        userEvent.click(getByRole('button'))

        expect(axios.post).toHaveBeenCalledWith
            (
                `${BASE_URL}/users/signup`,
                { username: 'test_username', password: 'StrongP@ssword123', confirm_password: 'StrongP@ssword123', email: 'testemail@domain.com' }
            );
    });

    it("Should validate form fields", async () => {
        const { getByLabelText, getByTestId, getByRole } = render(<Signup />, { wrapper: BrowserRouter });

        await act(async () => {
            fireEvent.change(getByLabelText(/username/i), { target: { value: 'test_username' } })
        });
        await act(async () => {
            fireEvent.change(getByLabelText(/email/i), { target: { value: 'testemail@domain.com' } })
        });
        await act(async () => {
            fireEvent.change(getByTestId("password"), { target: { value: 'StrongP@ssword123' } })
        });
        await act(async () => {
            fireEvent.change(getByTestId("confirm_password"), { target: { value: 'StrongP@ssword1234' } })
        });
        act(async () => {
            fireEvent.click(getByRole('button'))
        });
        expect(axios.post).not.toHaveBeenCalled();
        expect(alertStore.getState().message == "Passwords dont match").toBeTruthy();
    });

});