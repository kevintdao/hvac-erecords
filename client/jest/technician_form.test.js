import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import TechnicianForm from "../components/technicians/TechnicianForm";

const data = {
    user_id: 5,
    company_id: 1,
    first_name: "John",
    last_name: "Doe",
    phone_number: "111-111-1111",
    license_number: 5,
}

afterEach(cleanup);

test('Should watch technician input correctly', () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const userIdInput = container.querySelector("input#user_id");
    const compnayIdInput = container.querySelector("input#company_id");
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");
  
    fireEvent.input(userIdInput, { target: { value: input.user_id } });
    fireEvent.input(compnayIdInput, { target: { value: input.company_id } });
    fireEvent.input(firstNameInput, { target: { value: input.first_name } });
    fireEvent.change(lastNameInput, { target: { value: input.last_name } });
    fireEvent.input(phoneNumberInput, { target: { value: input.phone_number } });
    fireEvent.input(licenseNumberInput, { target: { value: input.license_number } });
  
    expect(userIdInput.value).toEqual(input.user_id);
    expect(compnayIdInput.value).toEqual(input.company_id);
    expect(firstNameInput.value).toEqual(input.first_name);
    expect(lastNameInput.value).toEqual(input.last_name);
    expect(phoneNumberInput.value).toEqual(input.phone_number);
    expect(licenseNumberInput.value).toEqual(input.license_number);
  })

  test("Should display error message when technician inputs are empty", async () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const userIdInput = container.querySelector("input#user_id");
    const compnayIdInput = container.querySelector("input#company_id");
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");

    const userIdError = container.querySelector("span#user_id-help");
    const compnayIdError = container.querySelector("span#company_id-help");
    const firstNameError = container.querySelector("span#first_name-help");
    const lastNameError = container.querySelector("span#last_name-help");
    const phoneNumberError = container.querySelector("span#phone_number-help");
    const licenseNumberError = container.querySelector("span#license_number-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(userIdInput.value.length).toEqual(0);
    expect(compnayIdInput.value.length).toEqual(0);
    expect(firstNameInput.value.length).toEqual(0);
    expect(lastNameInput.value.length).toEqual(0);
    expect(phoneNumberInput.value.length).toEqual(0);
    expect(licenseNumberInput.value.length).toEqual(0);

    expect(userIdError.textContent).toBe("Enter a User ID");
    expect(compnayIdError.textContent).toBe("Enter a Company ID");
    expect(firstNameError.textContent).toBe("Enter a First Name");
    expect(lastNameError.textContent).toBe("Enter a Last Name");
    expect(phoneNumberError.textContent).toBe("Enter a Phone Number");
    expect(licenseNumberError.textContent).toBe("Enter a License Number");
  })