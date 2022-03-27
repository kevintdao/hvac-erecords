import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import CompanyForm from "../components/companies/CompanyForm"

const input = {
    name: "University of Iowa",
    street: "123 Street",
    city: "Iowa City",
    zip_code: "52240",
    country: "United States",
    phone_number: "100-100-1000"
}

afterEach(cleanup);

test('should watch input correctly', () => {
    const { container } = render(<CompanyForm type="Create"/>);
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneNumberInput = container.querySelector("input#phone_number");

    fireEvent.input(nameInput, { target: { value: input.name } });
    fireEvent.input(streetInput, { target: { value: input.street } });
    fireEvent.input(cityInput, { target: { value: input.city } });
    fireEvent.input(zipCodeInput, { target: { value: input.zip_code } });
    fireEvent.input(countryInput, { target: { value: input.country } });
    fireEvent.input(phoneNumberInput, { target: { value: input.phone_number } });

    expect(nameInput.value).toEqual(input.name);
    expect(streetInput.value).toEqual(input.street);
    expect(cityInput.value).toEqual(input.city);
    expect(zipCodeInput.value).toEqual(input.zip_code);
    expect(countryInput.value).toEqual(input.country);
    expect(phoneNumberInput.value).toEqual(input.phone_number);
})

test("should display error message when inputs are empty", async () => {
    const { container } = render(<CompanyForm type="Create"/>);
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneNumberInput = container.querySelector("input#phone_number");

    const nameError = container.querySelector("span#name-help");
    const streetError = container.querySelector("span#street-help");
    const cityError = container.querySelector("span#city-help");
    const zipCodeError = container.querySelector("span#zip_code-help");
    const countryError = container.querySelector("span#country-help");
    const phoneNumberError = container.querySelector("span#phone_number-help");

    const createButton = container.querySelector("button#create-button");
    await act(async () => { fireEvent.submit(createButton); });

    expect(nameInput.value.length).toEqual(0);
    expect(streetInput.value.length).toEqual(0);
    expect(cityInput.value.length).toEqual(0);
    expect(zipCodeInput.value.length).toEqual(0);
    expect(countryInput.value.length).toEqual(0);
    expect(phoneNumberInput.value.length).toEqual(0);

    expect(nameError.textContent).toBe("Enter a Company Name");
    expect(streetError.textContent).toBe("Enter a Street");
    expect(cityError.textContent).toBe("Enter a City");
    expect(zipCodeError.textContent).toBe("Enter a Zip Code");
    expect(countryError.textContent).toBe("Enter a Country");
    expect(phoneNumberError.textContent).toBe("Enter a Phone Number");
})