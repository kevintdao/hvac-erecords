import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import TechnicianForm from "../components/technicians/TechnicianForm";

const data = {
    id: 1,
    company: 1,
    first_name: "John",
    last_name: "Doe",
    phone_number: "111-111-1111",
    license_number: 5,
}

afterEach(cleanup);

test('Should watch technician input correctly', () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const companyInput = container.querySelector("input#company");
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");
  
    fireEvent.input(companyInput, { target: { value: data.company } });
    fireEvent.input(firstNameInput, { target: { value: data.first_name } });
    fireEvent.input(lastNameInput, { target: { value: data.last_name } });
    fireEvent.input(phoneNumberInput, { target: { value: data.phone_number } });
    fireEvent.input(licenseNumberInput, { target: { value: data.license_number } });
  
    expect(companyInput.value).toEqual(data.company.toString());
    expect(firstNameInput.value).toEqual(data.first_name);
    expect(lastNameInput.value).toEqual(data.last_name);
    expect(phoneNumberInput.value).toEqual(data.phone_number);
    expect(licenseNumberInput.value).toEqual(data.license_number.toString());
  })

  test("Should display error message when technician inputs are empty", async () => {
    const { container } = render(<TechnicianForm type="Create"/>);
    const companyInput = container.querySelector("input#company");
    const firstNameInput = container.querySelector("input#first_name");
    const lastNameInput = container.querySelector("input#last_name");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const licenseNumberInput = container.querySelector("input#license_number");

    const companyError = container.querySelector("span#company-help");
    const firstNameError = container.querySelector("span#first_name-help");
    const lastNameError = container.querySelector("span#last_name-help");
    const phoneNumberError = container.querySelector("span#phone_number-help");
    const licenseNumberError = container.querySelector("span#license_number-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(companyInput.value.length).toEqual(0);
    expect(firstNameInput.value.length).toEqual(0);
    expect(lastNameInput.value.length).toEqual(0);
    expect(phoneNumberInput.value.length).toEqual(0);
    expect(licenseNumberInput.value.length).toEqual(0);

    expect(companyError.textContent).toBe("Enter a Company");
    expect(firstNameError.textContent).toBe("Enter a First Name");
    expect(lastNameError.textContent).toBe("Enter a Last Name");
    expect(phoneNumberError.textContent).toBe("Enter a Phone Number");
    expect(licenseNumberError.textContent).toBe("Enter a License Number");
  })