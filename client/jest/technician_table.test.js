import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TechnicianTable from "../components/technicians/TechnicianTable";

const labels = {
    text: ["First Name", "Last Name"],
    id: ["first_name", "last_name"],
};

const data = [
    {
        user: 1,
        company: 1,
        first_name: "John",
        last_name: "Doe",
        phone_number: "111-111-1111",
        license_number: 5,
    },
    {
        user: 2,
        company: 1,
        first_name: "Ryan",
        last_name: "Baker",
        phone_number: "000-000-0000",
        license_number: 6,
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
        const first_name = container.querySelector(`td#first_name-${item.user}`);
        const last_name = container.querySelector(`td#last_name-${item.user}`);
    
        expect(first_name.textContent).toEqual(item.first_name);
        expect(last_name.textContent).toEqual(item.last_name);
      })
})
