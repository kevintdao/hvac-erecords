import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import BuildingForm from "../components/buildings/BuildingForm"

const input = {
    id: 1,
    owner_id: 1,
    site_name: "Iowa",
    street: "123 Street",
    city: "Iowa City",
    zip_code: "52240",
    country: "United States"
}

afterEach(cleanup);

test('Should watch building input correctly', () => {
    const {container} = render(<BuildingForm type="Create"/>);
    const ownerIdInput = container.querySelector("input#owner_id");
    const siteNameInput = container.querySelector("input#site_name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");

    fireEvent.input(ownerIdInput, { target: { value: input.owner_id} });
    fireEvent.input(siteNameInput, { target: { value: input.site_name} });
    fireEvent.input(streetInput, { target: { value: input.street} });
    fireEvent.input(cityInput, { target: { value: input.city} });
    fireEvent.input(zipCodeInput, { target: { value: input.zip_code} });
    fireEvent.input(countryInput, { target: { value: input.country} });

    expect(ownerIdInput.textContent).toEqual(data.owner_id.toString());
    expect(siteNameInput.textContent).toEqual(data.site_name);
    expect(streetInput.textContent).toEqual(data.street);
    expect(cityInput.textContent).toEqual(data.zip_code);
    expect(zipCodeInput.textContent).toEqual(data.zip_code);
    expect(countryInput.textContent).toEqual(data.country);
})

test("Should display error message when building inputs are empty", async () => {
    const {container} = render(<BuildingForm type="Create"/>);
    const ownerIdInput = container.querySelector("input#owner_id");
    const siteNameInput = container.querySelector("input#site_name");
    const streetInput = container.querySelector("input#street");
    const cityInput = container.querySelector("input#city");
    const zipCodeInput = container.querySelector("input#zip_code");
    const countryInput = container.querySelector("input#country");

    const ownerIdError = container.querySelector("span#owner_id-help");
    const siteNameError = container.querySelector("span#site_name-help");
    const streetError = container.querySelector("span#street-help");
    const cityError = container.querySelector("span#city");
    const zipCodeError = container.querySelector("span#zip_code-help");
    const countryError = container.querySelector("span#country-help");

    const createButton = container.querySelector("button#create-button");

    await act(async () => { fireEvent.submit(createButton); });

    expect(ownerIdInput.value.length).toEqual(0);
    expect(siteNameInput.value.length).toEqual(0);
    expect(streetInput.value.length).toEqual(0);
    expect(cityInput.value.length).toEqual(0);
    expect(zipCodeInput.value.length).toEqual(0);
    expect(countryInput.value.length).toEqual(0);

    expect(ownerIdError.textContent).toBe("Enter an Owner ID");
    expect(siteNameError.textContent).toBe("Enter a Site Name");
    expect(streetError.textContent).toBe("Enter a Street");
    expect(cityError.textContent).toBe("Enter a City");
    expect(zipCodeError.textContent).toBe("Enter a Zip Code");
    expect(countryError.textContent).toBe("Enter a Country");
})
