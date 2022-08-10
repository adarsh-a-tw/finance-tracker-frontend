import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";
import axios from 'axios';

import authStore from "../store/authStore"

import { BASE_URL } from "../api/base";
import alertStore from "../store/alertStore";

jest.mock("../store/authStore")

jest.mock("axios");

describe("Login component tests", () => {

    it("Should display login form and sign up link", () => {
        authStore.mockReturnValue({ login: () => { } })

        const { getByLabelText, getByRole, getByText } = render(<Login />, { wrapper: BrowserRouter });

        expect(getByLabelText(/username/i)).toBeDefined();
        expect(getByLabelText(/password/i)).toBeDefined();
        expect(getByRole('button')).toHaveTextContent(/submit/i);
        expect(getByText("Don't have an account? Sign Up")).toBeDefined();
    });

    it("Should submit form and login user", async () => {
        authStore.mockReturnValue({ login: () => { } })
        const { getByLabelText, getByRole } = render(<Login />, { wrapper: BrowserRouter });


        axios.post.mockResolvedValueOnce({ token: 'test_token' });


        fireEvent.change(getByLabelText(/username/i), { target: { value: 'test-username' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'test-password' } });
        fireEvent.click(getByRole('button'));

        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/users/authenticate`, { username: 'test-username', password: 'test-password' });
    })

    it("Should show error message when invalid credentials", async () => {
        authStore.mockReturnValue({ login: () => { } })
        const { getByLabelText, getByRole } = render(<Login />, { wrapper: BrowserRouter });


        axios.post.mockImplementation(() => Promise.reject({ status: 401, response: { data: { message: 'Invalid Credentials' } } }));


        fireEvent.change(getByLabelText(/username/i), { target: { value: 'test-username' } });
        fireEvent.change(getByLabelText(/password/i), { target: { value: 'test-password' } });
        fireEvent.click(getByRole('button'));
        expect(axios.post).toHaveBeenCalledWith(`${BASE_URL}/users/authenticate`, { username: 'test-username', password: 'test-password' });
        await waitFor(() => { expect(alertStore.getState().message == "Invalid Credentials").toBeTruthy() });
    })
});