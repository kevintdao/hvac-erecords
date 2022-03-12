import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TechnicianDetails from "../components/technicians/TechnicianDetails";

const data = {
    user_id: 5,
    company_id: 1,
    first_name: "John",
    last_name: "Doe",
    phone_number: "111-111-1111",
    license_number: 5,
}

afterEach(cleanup);

test("Should display preset technician data", () => {
    const { container } = render(<TechnicianDetails data={data}/>);
    const user_id = container.querySelector("dd#user_id");
    const company_id = container.querySelector("dd#company_id");
    const first_name = container.querySelector("dd#first_name");
    const last_name = container.querySelector("dd#last_name");
    const phone_number = container.querySelector("dd#phone_number");
    const license_number = container.querySelector("dd#license_number");

    expect(user_id.textContent).toEqual(data.user_id);
    expect(company_id.textContent).toEqual(data.company_id);
    expect(first_name.textContent).toEqual(data.first_name);
    expect(last_name.textContent).toEqual(data.last_name);
    expect(phone_number.textContent).toEqual(data.phone_number);
    expect(license_number.textContent).toEqual(data.license_number);
})
