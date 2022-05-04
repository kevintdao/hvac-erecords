import { render, fireEvent, cleanup, act } from "@testing-library/react"
import CompanyUserDetails from "../components/company-users/CompanyUserDetails"

const data = {
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

test("Should display preset company user data", () => {
    const { container } = render(<CompanyUserDetails data={data}/>);
    // const company = container.querySelector("dd#company");
    const name = container.querySelector("dd#name");
    const email = container.querySelector("dd#email");
    const phone_number = container.querySelector("dd#phone_number");
    const street = container.querySelector("dd#street");
    const city = container.querySelector("dd#city");
    const zip_code = container.querySelector("dd#zip_code");
    const country = container.querySelector("dd#country");

    // expect(company.textContent).toEqual(data.company.toString());
    expect(name.textContent).toEqual(data.name);
    expect(email.textContent).toEqual(data.email)
    expect(phone_number.textContent).toEqual(data.phone_number);
    expect(street.textContent).toEqual(data.street);
    expect(city.textContent).toEqual(data.city);
    expect(zip_code.textContent).toEqual(data.zip_code);
    expect(country.textContent).toEqual(data.country);
})
