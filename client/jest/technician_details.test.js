import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TechnicianDetails from "../components/technicians/TechnicianDetails";

const data = {
    id: 1,
    company: 1,
    first_name: "John",
    last_name: "Doe",
    phone_number: "111-111-1111",
    license_number: 5,
}

afterEach(cleanup);

test("Should display preset technician data", () => {
    const { container } = render(<TechnicianDetails data={data}/>);
    const company = container.querySelector("dd#company");
    const first_name = container.querySelector("dd#first_name");
    const last_name = container.querySelector("dd#last_name");
    const phone_number = container.querySelector("dd#phone_number");
    const license_number = container.querySelector("dd#license_number");

    expect(company.textContent).toEqual(data.company.toString());
    expect(first_name.textContent).toEqual(data.first_name);
    expect(last_name.textContent).toEqual(data.last_name);
    expect(phone_number.textContent).toEqual(data.phone_number);
    expect(license_number.textContent).toEqual(data.license_number.toString());
})
