import { render, fireEvent, cleanup, act } from "@testing-library/react"
import Register from "../components/Register"

const invalidEmail = "testtest";
const longEmail = `
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters@gmail.com
`;
const validEmail = "test@test.com";

const invalidPassword = [
  {
    // below min length
    value: "123456",
    message: "Must contains at least 8 characters",
  },
  {
    // doesn't contain special character
    value: "Test1234",
    message: "Must contains at least 1 special character and 1 number"
  },
  {
    // doesn't contain number
    value: "catsanddogs",
    message: "Must contains at least 1 special character and 1 number"
  },
  {
    // more than 32 characters
    value: "thisisaverylongpasswordthatismorethan32characters",
    message: "Must not exceed 32 characters"
  }
];
const validPassword = "Test123!"

afterEach(cleanup);

test("should watch the input correctly", () => {
  const { container } = render(<Register />);
  const emailInput = container.querySelector("input#email");
  const passInput = container.querySelector("input#password");
  const confirmPassInput = container.querySelector("input#password-confirm");

  fireEvent.input(emailInput, { target: { value: validEmail } });
  fireEvent.input(passInput, { target: { value: validPassword } });
  fireEvent.input(confirmPassInput, { target: { value: validPassword } });

  expect(emailInput.value).toEqual(validEmail);
  expect(passInput.value).toEqual(validPassword);
  expect(confirmPassInput.value).toEqual(validPassword);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<Register />);
  const emailInput = container.querySelector("input#email");
  const passInput = container.querySelector("input#password");
  const confirmPassInput = container.querySelector("input#password-confirm");
  const emailError = container.querySelector("span#email-help");
  const passError = container.querySelector("span#pass-help");
  const passConfError = container.querySelector("span#pass-confirm-help");

  const signupButton = container.querySelector("button#register-button");

  await act(async () => { fireEvent.submit(signupButton); });

  expect(emailInput.value.length).toEqual(0);
  expect(passInput.value.length).toEqual(0);
  expect(confirmPassInput.value.length).toEqual(0);
  expect(emailError.textContent).toBe("Enter an email");
  expect(passError.textContent).toBe("Enter a password");
  expect(passConfError.textContent).toBe("Confirm your password");
})

test("should display error message when email is invalid", async () => {
  const { container } = render(<Register />);
  const emailInput = container.querySelector("input#email");
  const emailError = container.querySelector("span#email-help");
  const signupButton = container.querySelector("button#register-button");

  fireEvent.input(emailInput, { target: { value: invalidEmail } });

  await act(async () => { fireEvent.submit(signupButton); });

  expect(emailInput.value).not.toMatch(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
  expect(emailError.textContent).toBe("Enter a valid email");
})

test("should display error message when email exceed characters limit", async () => {
  const { container } = render(<Register />);
  const emailInput = container.querySelector("input#email");
  const emailError = container.querySelector("span#email-help");
  const signupButton = container.querySelector("button#register-button");

  fireEvent.input(emailInput, { target: { value: longEmail } });

  await act(async () => { fireEvent.submit(signupButton); });

  expect(emailInput.value.length).toBeGreaterThan(320);
  expect(emailError.textContent).toBe("Email address should not exceed 320 characters");
})

test("should display error message when password is not a valid password", async () => {
  const { container } = render(<Register />);
  const passInput = container.querySelector("input#password");
  const passError = container.querySelector("span#pass-help");
  const signupButton = container.querySelector("button#register-button");

  for(let i = 0; i < invalidPassword.length; i++){
    fireEvent.input(passInput, { target: { value: invalidPassword[i].value } });

    await act(async () => { fireEvent.submit(signupButton); });

    switch(i){
      case 0:
        expect(passInput.value.length).toBeLessThan(8);
        break;
      case 1:
        const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        expect(specialCharsRegex.test(passInput.value)).toBeFalsy();
        break;
      case 2:
        const numRegex = /\d/;
        expect(numRegex.test(passInput.value)).toBeFalsy();
        break;
      case 3:
        expect(passInput.value.length).toBeGreaterThan(32);
        break;
      default:
        break;
    }
    expect(passError.textContent).toBe(invalidPassword[i].message);
  }
})

test("should display error message when confirm password does not match password", async () => {
  const { container } = render(<Register />);
  const passInput = container.querySelector("input#password");
  const confirmPassInput = container.querySelector("input#password-confirm");
  const passConfError = container.querySelector("span#pass-confirm-help");
  const signupButton = container.querySelector("button#register-button");

  fireEvent.input(passInput, { target: { value: validPassword } });
  fireEvent.input(confirmPassInput, { target: { value: "Test1234!" } });

  await act(async () => { fireEvent.submit(signupButton); });

  expect(passConfError.textContent).toBe("Passwords do not match");
})

test("should remove error message when inputs are filled in correctly", async () => {
  const { container } = render(<Register />);
  const emailInput = container.querySelector("input#email");
  const passInput = container.querySelector("input#password");
  const confirmPassInput = container.querySelector("input#password-confirm");
  const emailError = container.querySelector("span#email-help");
  const passError = container.querySelector("span#pass-help");
  const passConfError = container.querySelector("span#pass-confirm-help");
  const signupButton = container.querySelector("button#register-button");

  await act(async () => { fireEvent.submit(signupButton); });

  expect(emailError.textContent).toBe("Enter an email");
  expect(emailError.textContent).toBe("Enter an email");
  expect(passError.textContent).toBe("Enter a password");
  expect(passConfError.textContent).toBe("Confirm your password");

  await act(async () => { fireEvent.input(emailInput, { target: { value: validEmail } }); });
  await act(async () => { fireEvent.input(passInput, { target: { value: validPassword } }); });
  await act(async () => { fireEvent.input(confirmPassInput, { target: { value: validPassword } }); });

  expect(emailError.textContent).toBe("");
  expect(passError.textContent).toBe("");
  expect(passConfError.textContent).toBe("");
})