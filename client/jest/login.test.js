import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import Login from "../components/Login"

const mockEmail = "test@test.com";
const mockPass = "123456";
const mockData = {
  email: mockEmail,
  password: mockPass
}

afterEach(cleanup);

test("should watch input correctly", () => {
  const { container } = render(<Login />);
  const emailInput = container.querySelector("input#email");
  const passInput = container.querySelector("input#password");

  fireEvent.input(emailInput, {
    target: {
      value: mockEmail
    }
  });

  fireEvent.input(passInput, {
    target: {
      value: mockPass
    }
  });

  expect(emailInput.value).toEqual(mockEmail);
  expect(passInput.value).toEqual(mockPass);
})

test("should display the error messages when inputs are empty", async () => {
  const { container } = render(<Login />);
  const loginButton = container.querySelector("button#login-button");
  const emailError = container.querySelector("span#email-help");
  const passError = container.querySelector("span#pass-help");

  await act(async () => {
    fireEvent.submit(loginButton);
  });

  expect(emailError.textContent).toBe("You must enter your email!");
  expect(passError.textContent).toBe("You must enter your password!");
})

test("should submit the input data", async () => {
  const { container } = render(<Login />);
  const loginButton = container.querySelector("button#login-button");
  const emailInput = container.querySelector("input#email");
  const passInput = container.querySelector("input#password");

  fireEvent.input(emailInput, {
    target: {
      value: mockEmail
    }
  });

  fireEvent.input(passInput, {
    target: {
      value: mockPass
    }
  });

  await act(async () => {
    fireEvent.submit(loginButton);
  });

  expect(emailInput.value).toEqual(mockEmail);
  expect(passInput.value).toEqual(mockPass);
  expect({ 
    email: emailInput.value,
    password: passInput.value
  }).toEqual(mockData);
})