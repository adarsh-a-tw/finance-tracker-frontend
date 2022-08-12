import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import axios from 'axios';


import { BASE_URL } from "../api/base";
import alertStore from "../store/alertStore";
import { act } from "react-dom/test-utils";


jest.mock("axios");

describe("Login component tests", () => {

    it("Should display login form and sign up link", () => {

        const { getByLabelText, getByRole, getByText } = render(<Login />, { wrapper: BrowserRouter });

        expect(getByLabelText(/username/i)).toBeDefined();
        expect(getByLabelText(/password/i)).toBeDefined();
        expect(getByRole('button')).toHaveTextContent(/submit/i);
        expect(getByText("Don't have an account? Sign Up")).toBeDefined();
    });

    it("Should submit form and login user", async () => {
        const { getByLabelText, getByRole } = render(<Login />, { wrapper: BrowserRouter });


        axios.post.mockResolvedValueOnce({ token: 'test_token', refresh_token: "test_refresh_token" });


        await act(async () => {
            fireEvent.change(getByLabelText(/username/i), { target: { value: 'test-username' } })
        });
        await act(async () => {
            fireEvent.change(getByLabelText(/password/i), { target: { value: 'test-password' } })
        });
        await act(async () => {
            fireEvent.click(getByRole('button'))
        });

        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/users/authenticate`, { username: 'test-username', password: 'test-password' });
    })

    it("Should show error message when invalid credentials", async () => {
        const { getByLabelText, getByRole } = render(<Login />, { wrapper: BrowserRouter });


        axios.post.mockImplementation(() => Promise.reject({ status: 401, response: { data: { message: 'Invalid Credentials' } } }));

        await act(async () => {
            fireEvent.change(getByLabelText(/username/i), { target: { value: 'test-username' } })
        });
        await act(async () => {
            fireEvent.change(getByLabelText(/password/i), { target: { value: 'test-password' } })
        });
        await act(async () => {
            fireEvent.click(getByRole('button'))
        });
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/users/authenticate`, { username: 'test-username', password: 'test-password' });
        await waitFor(() => { expect(alertStore.getState().message == "Invalid Credentials").toBeTruthy() });
    })
});