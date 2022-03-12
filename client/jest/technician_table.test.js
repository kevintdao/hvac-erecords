import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TechnicianTable from "../components/technicians/TechnicianTable";

const labels = {
    text: ["User ID", "Company ID", "First Name", "Last Name"],
    id: ["user_id", "company_id", "first_name", "last_name"],
};

const data = [
    {
        user_id: 5,
        company_id: 1,
        first_name: "John",
        last_name: "Doe",
    },
    {
        user_id: 6,
        company_id: 1,
        first_name: "Ryan",
        last_name: "Baker",
    },
];

afterEach(cleanup);

test("Should display preset table data", () => {
    const { container } = render(<TechnicianTable data={data} labels={labels}/>);

    labels.id.map((item, index) => {
        const element = container.querySelector(`th#${item}`);
        expect(element.textContent).toEqual(labels.text[index]);
    });

    data.map((item, index) => {
        const user_id = container.querySelector(`td#user_id-${item.id}`);
        const company_id = container.querySelector(`td#company_id-${item.id}`);
        const first_name = container.querySelector(`td#first_name-${item.id}`);
        const last_name = container.querySelector(`td#last_name-${item.id}`);
    
        expect(user_id.textContent).toEqual(item.external_id);
        expect(company_id.textContent).toEqual(item.model_number);
        expect(first_name.textContent).toEqual(item.serial_number);
        expect(last_name.textContent).toEqual(item.category);
      })
})
