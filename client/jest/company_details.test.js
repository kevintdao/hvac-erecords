import { render, fireEvent, cleanup, act } from "@testing-library/react"
import CompanyDetails from "../components/companies/CompanyDetails"

const data = {
    name: "University of Iowa",
    street: "123 Street",
    city: "Iowa City",
    zip_code: "52240",
    country: "United States",
    phone_number: "100-100-1000"
}

afterEach(cleanup);

test('should display the data', () => {
    const { container } = render(<CompanyDetails data={data}/>);
    const name = container.querySelector("dd#name");
    const street = container.querySelector("dd#street");
    const city = container.querySelector("dd#city");
    const zip_code = container.querySelector("dd#zip_code");
    const country = container.querySelector("dd#country");
    const phone_number = container.querySelector("dd#production_date");
  
    expect(name.textContent).toEqual(data.name);
    expect(street.textContent).toEqual(data.street);
    expect(city.textContent).toEqual(data.city);
    expect(zip_code.textContent).toEqual(data.zip_code);
    expect(country.textContent).toEqual(data.country);
    expect(phone_number.textContent).toEqual(data.phone_number);
})