import { render, fireEvent, cleanup, act } from "@testing-library/react"
import MaintenanceCompanyRegister from "../components/MaintenanceCompanyRegister"

const validName = "Example Company";
const validStreet = "963 S Ave.";
const validCity = "Random City";
const validZip = "12345";
const validCountry = "United States";
const validPhone = "3193844357";
const validPhoneOutput = "(319) 384-4357";
const invalidPhone = "555554444333221";

afterEach(cleanup);

test("should watch input correctly", () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneInput = container.querySelector("input#phone");

    fireEvent.input(nameInput, { target: { value: validName } });
    fireEvent.input(streetInput, { target: { value: validStreet } });
    fireEvent.input(cityInput, { target: { value: validCity } });
    fireEvent.input(zipCodeInput, { target: { value: validZip } });
    fireEvent.input(countryInput, { target: { value: validCountry } });
    fireEvent.input(phoneInput, { target: { value: validPhone } });

    expect(nameInput.value).toEqual(validName);
    expect(streetInput.value).toEqual(validStreet);
    expect(cityInput.value).toEqual(validCity);
    expect(zipCodeInput.value).toEqual(validZip);
    expect(countryInput.value).toEqual(validCountry);
    expect(phoneInput.value).toEqual(validPhoneOutput);
})

test("should display error message when inputs are empty", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneInput = container.querySelector("input#phone");

    const nameError = container.querySelector("span#name-help");
    const streetError = container.querySelector("span#street-help");
    const cityError = container.querySelector("span#city-help");
    const zipCodeError = container.querySelector("span#zip_code-help");
    const countryError = container.querySelector("span#name-help");
    const phoneError = container.querySelector("span#phone-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(nameInput.value.length).toEqual(0);
    expect(cityInput.value.length).toEqual(0);
    expect(zipCodeInput.value.length).toEqual(0);
    expect(phoneInput.value.length).toEqual(0);

    expect(nameError.textContent).toBe("Enter a Maintenance Company Name");
    expect(cityError.textContent).toBe("Enter a City");
    expect(zipCodeError.textContent).toBe("Enter a Zip Code");
    expect(phoneError.textContent).toBe("Enter a Phone Number");
})

test("should display error message when phone number is invalid", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const phoneInput = container.querySelector("input#phone");
    const phoneError = container.querySelector("span#phone-help");
    const createButton = container.querySelector("button#create-button");

    fireEvent.input(phoneInput, { target: { value: invalidPhone } });

    await act(async () => { fireEvent.submit(createButton); });

    expect(phoneInput.value).toBe(invalidPhone);
    expect(phoneError.textContent).toBe("Enter a Valid Phone Number");
})
