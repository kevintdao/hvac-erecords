import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import BuildingOwnerRegister from "../components/BuildingOwnerRegister"

const invalidEmail = "testtest";
const longEmail = `
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters
  thisisaverylongemailthatwillnotbevalidfortheregistrationasithavemorethan320characters@gmail.com
`;
const validEmail = "test@test.com";

const validPhone = "3191234567";
const validPhoneOutput = "(319) 123-4567"
const invalidPhone = "323334444454";

afterEach(cleanup);

test("should watch input correctly", () => {
  const { container } = render(<BuildingOwnerRegister />);
  const emailInput = container.querySelector("input#email");
  const fnameInput = container.querySelector("input#first-name");
  const lnameInput = container.querySelector("input#last-name");
  const phoneInput = container.querySelector("input#phone");

  fireEvent.input(emailInput, { target: { value: validEmail } });
  fireEvent.input(fnameInput, { target: { value: "John" } });
  fireEvent.input(lnameInput, { target: { value: "Doe" } });
  fireEvent.input(phoneInput, { target: { value: validPhone } });

  expect(emailInput.value).toEqual(validEmail);
  expect(fnameInput.value).toEqual("John");
  expect(lnameInput.value).toEqual("Doe");
  expect(phoneInput.value).toEqual(validPhoneOutput);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<BuildingOwnerRegister />);
  const emailInput = container.querySelector("input#email");
  const fnameInput = container.querySelector("input#first-name");
  const lnameInput = container.querySelector("input#last-name");
  const phoneInput = container.querySelector("input#phone");
  const emailError = container.querySelector("span#email-help");
  const fnameError = container.querySelector("span#fname-help");
  const lnameError = container.querySelector("span#lname-help");
  const phoneError = container.querySelector("span#phone-help");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(emailInput.value.length).toEqual(0);
  expect(fnameInput.value.length).toEqual(0);
  expect(lnameInput.value.length).toEqual(0);
  expect(phoneInput.value.length).toEqual(0);
  expect(emailError.textContent).toBe("Enter an email");
  expect(fnameError.textContent).toBe("Enter a first name");
  expect(lnameError.textContent).toBe("Enter a last name");
  expect(phoneError.textContent).toBe("Enter a phone number");
})

test("should display error message when email is invalid", async () => {
  const { container } = render(<BuildingOwnerRegister />);
  const emailInput = container.querySelector("input#email");
  const emailError = container.querySelector("span#email-help");
  const createButton = container.querySelector("button#create-button");

  fireEvent.input(emailInput, { target: { value: invalidEmail } });

  await act(async () => { fireEvent.submit(createButton); });

  expect(emailInput.value).not.toMatch(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
  expect(emailError.textContent).toBe("Enter a valid email");
})

test("should display error message when email exceed characters limit", async () => {
  const { container } = render(<BuildingOwnerRegister />);
  const emailInput = container.querySelector("input#email");
  const emailError = container.querySelector("span#email-help");
  const createButton = container.querySelector("button#create-button");

  fireEvent.input(emailInput, { target: { value: longEmail } });

  await act(async () => { fireEvent.submit(createButton); });

  expect(emailInput.value.length).toBeGreaterThan(320);
  expect(emailError.textContent).toBe("Email address should not exceed 320 characters");
})

test("should display error message when phone number is invalid", async () => {
  const { container } = render(<BuildingOwnerRegister />);
  const phoneInput = container.querySelector("input#phone");
  const phoneError = container.querySelector("span#phone-help");
  const createButton = container.querySelector("button#create-button");

  fireEvent.input(phoneInput, { target: { value: invalidPhone } });

  await act(async () => { fireEvent.submit(createButton); });

  expect(phoneInput.value).toBe(invalidPhone);
  expect(phoneError.textContent).toBe("Enter a valid phone number");
})