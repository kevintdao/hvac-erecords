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

const invalidEmail = "invalid";
const longEmail = `
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters
    whilenotinvalidthisemailiswaytoolongandneedstobelessthan320characters@gmail.com
`;
const validEmail = "company@org.com";

afterEach(cleanup);

test("should watch input correctly", () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const emailInput = container.querySelector("input#email");
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneInput = container.querySelector("input#phone_number");

    fireEvent.input(emailInput, { target: {value: validEmail } });
    fireEvent.input(nameInput, { target: { value: validName } });
    fireEvent.input(streetInput, { target: { value: validStreet } });
    fireEvent.input(cityInput, { target: { value: validCity } });
    fireEvent.input(zipCodeInput, { target: { value: validZip } });
    fireEvent.input(countryInput, { target: { value: validCountry } });
    fireEvent.input(phoneInput, { target: { value: validPhone } });

    expect(emailInput.value).toEqual(validEmail);
    expect(nameInput.value).toEqual(validName);
    expect(streetInput.value).toEqual(validStreet);
    expect(cityInput.value).toEqual(validCity);
    expect(zipCodeInput.value).toEqual(validZip);
    expect(countryInput.value).toEqual(validCountry);
    expect(phoneInput.value).toEqual(validPhoneOutput);
})

test("should display error message when inputs are empty", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const emailInput = container.querySelector("input#email");
    const nameInput = container.querySelector("input#name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");
    const phoneInput = container.querySelector("input#phone_number");

    const emailError = container.querySelector("span#email-help")
    const nameError = container.querySelector("span#name-help");
    const streetError = container.querySelector("span#street-help");
    const cityError = container.querySelector("span#city-help");
    const zipCodeError = container.querySelector("span#zip_code-help");
    const countryError = container.querySelector("span#country-help");
    const phoneError = container.querySelector("span#phone_number-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(emailInput.value.length).toEqual(0);
    expect(nameInput.value.length).toEqual(0);
    expect(streetInput.value.length).toEqual(0);
    expect(cityInput.value.length).toEqual(0);
    expect(zipCodeInput.value.length).toEqual(0);
    expect(countryInput.value.length).toEqual(0);
    expect(phoneInput.value.length).toEqual(0);

    expect(emailError.textContent).toBe("Enter an Email");
    expect(nameError.textContent).toBe("Enter a Maintenance Company Name");
    expect(streetError.textContent).toBe("Enter a Street");
    expect(cityError.textContent).toBe("Enter a City");
    expect(zipCodeError.textContent).toBe("Enter a Zip Code");
    expect(countryError.textContent).toBe("Enter a Country");
    expect(phoneError.textContent).toBe("Enter a Phone Number");
})

test("should display error message when phone number is invalid", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const phoneInput = container.querySelector("input#phone_number");
    const phoneError = container.querySelector("span#phone_number-help");
    const createButton = container.querySelector("button#create-button");

    fireEvent.input(phoneInput, { target: { value: invalidPhone } });

    await act(async () => { fireEvent.submit(createButton); });

    expect(phoneInput.value).toBe(invalidPhone);
    expect(phoneError.textContent).toBe("Enter a Valid Phone Number");
})

test("should display error message when email is invalid", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const emailInput = container.querySelector("input#email");
    const emailError = container.querySelector("span#email-help");
    const createButton = container.querySelector("button#create-button");
  
    fireEvent.input(emailInput, { target: { value: invalidEmail } });
  
    await act(async () => { fireEvent.submit(createButton); });
  
    expect(emailInput.value).not.toMatch(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/);
    expect(emailError.textContent).toBe("Enter a Valid Email");
  })
  
  test("should display error message when email exceed characters limit", async () => {
    const { container } = render(<MaintenanceCompanyRegister />);
    const emailInput = container.querySelector("input#email");
    const emailError = container.querySelector("span#email-help");
    const createButton = container.querySelector("button#create-button");
  
    fireEvent.input(emailInput, { target: { value: longEmail } });
  
    await act(async () => { fireEvent.submit(createButton); });
  
    expect(emailInput.value.length).toBeGreaterThan(320);
    expect(emailError.textContent).toBe("Email address should not exceed 320 characters");
  })
