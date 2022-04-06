import { render, fireEvent, cleanup, act } from "@testing-library/react"
import BuildingDetails from "../components/buildings/BuildingDetails"

const data = {
    id: 1,
    owner_id: 1,
    site_name: "Iowa",
    street: "123 Street",
    city: "Iowa City",
    zip_code: "52240",
    country: "United States"
}

afterEach(cleanup);

test("Should display preset company data", () => {
    const { container } = render(<BuildingDetails data={data}/>);
    const owner_id = container.querySelector("dd#owner_id");
    const site_name = container.querySelector("dd#site_name");
    const street = container.querySelector("dd#street");
    const city = container.querySelector("dd#city");
    const zip_code = container.querySelector("dd#zip_code");
    const country = container.querySelector("dd#country");

    expect(owner_id.textContent).toEqual(data.owner_id.toString());
    expect(site_name.textContent).toEqual(data.site_name);
    expect(street.textContent).toEqual(data.street);
    expect(city.textContent).toEqual(data.zip_code);
    expect(zip_code.textContent).toEqual(data.zip_code);
    expect(country.textContent).toEqual(data.country);
})
