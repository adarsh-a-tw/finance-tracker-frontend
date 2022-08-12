import { render } from '@testing-library/react';
import App from './App';
import authStore from "./store/authStore"

jest.mock("./store/authStore", () => ({
  __esModule: true,
  default: jest.fn()
}))


test('should render login component when not logged in', () => {
  authStore.mockReturnValue({ loggedIn: false, refreshAuth: jest.fn() })

  const { getByText } = render(<App />)

  expect(getByText(/Login/i)).toBeDefined()
});


test("should render record books component when logged in", () => {
  authStore.mockReturnValue({ loggedIn: true, refreshAuth: jest.fn() })

  const { getByText } = render(<App />)

  expect(getByText(/recordbooks/i)).toBeDefined()
})