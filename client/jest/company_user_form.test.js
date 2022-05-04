import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import CompanyUserFrom from "../components/company-users/CompanyUserForm"

const input = {
    id: 1,
    company: 1,
    name: "Iowa",
    email: "uiowa@test.com",
    phone_number: "(252) 354-3230",
    street: "123 Street",
    city: "Iowa City",
    zip_code: "52240",
    country: "United States"
}

afterEach(cleanup);

test('should watch input correctly', () => {
    const { container } = render(<CompanyUserFrom type="Create"/>);
    // const companyInput = container.querySelector("input#company");
    const nameInput = container.querySelector("input#name");
    const emailInput = container.querySelector("input#email");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code")
    const countryInput = container.querySelector("input#country");

    // fireEvent.input(companyInput, { target: { value: input.company } });
    fireEvent.input(nameInput, { target: { value: input.name } });
    fireEvent.input(phoneNumberInput, { target: { value: input.phone_number } });
    fireEvent.input(emailInput, { target: { value: input.email } });
    fireEvent.input(streetInput, { target: { value: input.street } });
    fireEvent.input(cityInput, { target: { value: input.city } });
    fireEvent.input(zipCodeInput, { target: { value: input.zip_code } });
    fireEvent.input(countryInput, { target: { value: input.country } });

    // expect(companyInput.value).toEqual(input.company);
    expect(nameInput.value).toEqual(input.name);
    expect(phoneNumberInput.value).toEqual(input.phone_number);
    expect(emailInput.value).toEqual(input.email);
    expect(streetInput.value).toEqual(input.street);
    expect(cityInput.value).toEqual(input.city);
    expect(zipCodeInput.value).toEqual(input.zip_code);
    expect(countryInput.value).toEqual(input.country);
})

test("should display error message when inputs are empty", async () => {
    const { container } = render(<CompanyUserFrom type="Create"/>);
    // const companyInput = container.querySelector("input#company");
    const nameInput = container.querySelector("input#name");
    const emailInput = container.querySelector("input#email");
    const phoneNumberInput = container.querySelector("input#phone_number");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code")
    const countryInput = container.querySelector("input#country");

    // const companyError = container.querySelector("span#company-help");
    const nameError = container.querySelector("span#name-help");
    const phoneError = container.querySelector("span#phone-help");
    const emailError = container.querySelector("span#email-help");
    const streetError = container.querySelector("span#street-help");
    const cityError = container.querySelector("span#city-help");
    const zipCodeError = container.querySelector("span#zip_code-help")
    const countryError = container.querySelector("span#country-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    // expect(companyInput.value.length).toEqual(0);
    expect(nameInput.value.length).toEqual(0);
    expect(phoneNumberInput.value.length).toEqual(0);
    expect(emailInput.value.length).toEqual(0);
    expect(streetInput.value.length).toEqual(0);
    expect(cityInput.value.length).toEqual(0);
    expect(zipCodeInput.value.length).toEqual(0);
    expect(countryInput.value.length).toEqual(0);

    // expect(companyError.textContent).toBe("Enter a company");
    expect(nameError.textContent).toBe("Enter a name");
    expect(phoneError.textContent).toBe("Enter a phone number");
    expect(emailError.textContent).toBe("Enter a valid email address");
    expect(streetError.textContent).toBe("Enter a Street");
    expect(cityError.textContent).toBe("Enter a City");
    expect(zipCodeError.textContent).toBe("Enter a Zip Code");
    expect(countryError.textContent).toBe("Enter a Country");
})
