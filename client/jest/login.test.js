import { render, fireEvent, screen, queryByTestId, getByTestId, cleanup } from "@testing-library/react"
import Login from "../components/Login"

afterEach(cleanup);

test("Email input can't be empty", () => {
  const wrapper = render(<Login />);

  fireEvent.click(wrapper.queryByTestId("login-button"));

  expect(screen.queryByTestId("email-help").textContent).toBe("Cannot be empty!");
})

test("Password input can't be empty", () => {
  const wrapper = render(<Login />);

  fireEvent.click(wrapper.queryByTestId("login-button"));

  expect(screen.queryByTestId("pass-help").textContent).toBe("Cannot be empty!");
})

test("Inputs message should removed when inputs are filled out ", () => {
  const wrapper = render(<Login />);

  fireEvent.click(wrapper.queryByTestId("login-button"));

  expect(screen.queryByTestId("email-help").textContent).toBe("Cannot be empty!");
  expect(screen.queryByTestId("pass-help").textContent).toBe("Cannot be empty!");

  fireEvent.change(wrapper.getByTestId("email-input"), {target: {value: 'test@test.com'}});
  fireEvent.change(wrapper.getByTestId("pass-input"), {target: {value: '123456'}});

  expect(screen.queryByTestId("email-help").textContent).toBe("");
  expect(screen.queryByTestId("pass-help").textContent).toBe("");
})