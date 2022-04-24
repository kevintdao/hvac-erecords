import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import TechnicianForm from "../components/technicians/TechnicianForm";

const input = {
    id: 1,
    company: 1,
    first_name: "John",
    last_name: "Doe",
    phone_number: "(319) 384-4357",
    license_number: 5,
    email: "test@test.com"
}

afterEach(cleanup);

test('Should watch technician input correctly', () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");
    const emailInput = container.querySelector("input#email");

    fireEvent.input(firstNameInput, { target: { value: input.first_name } });
    fireEvent.input(lastNameInput, { target: { value: input.last_name } });
    fireEvent.input(phoneNumberInput, { target: { value: input.phone_number } });
    fireEvent.input(licenseNumberInput, { target: { value: input.license_number } });
    fireEvent.input(emailInput, {target: {value: input.email} });
  
    expect(firstNameInput.value).toEqual(input.first_name);
    expect(lastNameInput.value).toEqual(input.last_name);
    expect(phoneNumberInput.value).toEqual(input.phone_number);
    expect(licenseNumberInput.value).toEqual(input.license_number.toString());
    expect(emailInput.value).toEqual(input.email);
  })

  test("Should display error message when technician inputs are empty", async () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");
    const emailInput = container.querySelector("input#email");

    const firstNameError = container.querySelector("span#first_name-help");
    const lastNameError = container.querySelector("span#last_name-help");
    const phoneNumberError = container.querySelector("span#phone_number-help");
    const licenseNumberError = container.querySelector("span#license_number-help");
    const emailError = container.querySelector("span#email-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(firstNameInput.value.length).toEqual(0);
    expect(lastNameInput.value.length).toEqual(0);
    expect(phoneNumberInput.value.length).toEqual(0);
    expect(licenseNumberInput.value.length).toEqual(0);
    expect(emailInput.value.length).toEqual(0);

    expect(firstNameError.textContent).toBe("Enter a First Name");
    expect(lastNameError.textContent).toBe("Enter a Last Name");
    expect(phoneNumberError.textContent).toBe("Enter a Phone Number");
    expect(licenseNumberError.textContent).toBe("Enter a License Number");
    expect(emailError.textContent).toBe("Enter a valid email address");
  })