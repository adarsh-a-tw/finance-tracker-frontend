import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar"


describe("Navbar tests", () => {
    it("Should logout when logout button is clicked", () => {
        const logoutFn = jest.fn()
        const { getByText } = render(<Navbar logout={logoutFn} />,{ wrapper: BrowserRouter })

        userEvent.click(getByText("Logout"))

        expect(logoutFn).toHaveBeenCalledTimes(1)
    });
})