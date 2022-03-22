import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import Login from "../components/Login"

const mockEmail = "test@test.com";
const mockPass = "123456";
const mockData = {
  email: mockEmail,
  password: mockPass
}
const mockCallback = jest.fn();

afterEach(cleanup);

test("should watch input correctly", () => {
  const { container } = render(<Login onSubmit={mockCallback} />);
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
  const { container } = render(<Login onSubmit={mockCallback} />);
  const loginButton = container.querySelector("button#login-button");
  const emailError = container.querySelector("span#email-help");
  const passError = container.querySelector("span#pass-help");

  await act(async () => {
    fireEvent.submit(loginButton);
  });

  expect(emailError.textContent).toBe("Enter an email");
  expect(passError.textContent).toBe("Enter a password");
})

test("should display the error message when email is not valid", async () => {
  const { container } = render(<Login onSubmit={mockCallback} />);
  const emailInput = container.querySelector("input#email");
  const loginButton = container.querySelector("button#login-button");
  const emailError = container.querySelector("span#email-help");

  fireEvent.input(emailInput, {
    target: {
      value: "test"
    }
  });

  await act(async () => {
    fireEvent.submit(loginButton);
  });

  expect(emailError.textContent).toBe("Enter a valid email");
})

test("should submit the input data", async () => {
  const { container } = render(<Login onSubmit={mockCallback} />);
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