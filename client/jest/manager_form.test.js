import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import ManagerForm from "../components/managers/ManagerForm"

const input = {
    name: "12345",
    phone_number: "(319) 123-4567",
}

afterEach(cleanup);

test('should watch input correctly', () => {
  const { container } = render(<ManagerForm type="Create"/>);
  const nameInput = container.querySelector("input#name");
  const phoneNumberInput = container.querySelector("input#phone_number");

  fireEvent.input(nameInput, { target: { value: input.name } });
  fireEvent.input(phoneNumberInput, { target: { value: input.phone_number } });

  expect(nameInput.value).toEqual(input.name);
  expect(phoneNumberInput.value).toEqual(input.phone_number);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<ManagerForm type="Create"/>);
  const nameInput = container.querySelector("input#name");
  const phoneNumberInput = container.querySelector("input#phone_number");

  const nameError = container.querySelector("span#name-help");
  const phoneError = container.querySelector("span#phone-help");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(nameInput.value.length).toEqual(0);
  expect(phoneNumberInput.value.length).toEqual(0);
  expect(nameError.textContent).toBe("Enter a name");
  expect(phoneError.textContent).toBe("Enter a phone number");

})