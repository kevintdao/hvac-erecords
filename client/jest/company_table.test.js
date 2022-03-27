import { render, fireEvent, cleanup, act } from "@testing-library/react"
import CompanyTable from "../components/companies/CompanyTable"

const labels = {
    text: ["Company Name", "City", "Zip Code"],
    id: ["name", "city", "zip_code"],
};
const data = [
    {
        name: "University of Iowa",
        street: "123 Street",
        city: "Iowa City",
        zip_code: "52240",
        country: "United States",
        phone_number: "100-100-1000"
    },
    {
        name: "University of Wisconsin",
        street: "789 Street",
        city: "Madison",
        zip_code: "12345",
        country: "United States",
        phone_number: "120-120-1200"
    }
];

afterEach(cleanup);

test('should display the data', () => {
    const { container } = render(<CompanyTable data={data} labels={labels}/>);
  
    labels.id.map((item, index) => {
        const element = container.querySelector(`th#${item}`);
        expect(element.textContent).toEqual(labels.text[index]);
    });
  
    data.map((item, index) => {
        const name = container.querySelector(`td#name-${item.id}`);
        const city = container.querySelector(`td#city-${item.id}`);
        const zip_code = container.querySelector(`td#zip_code-${item.id}`);
    
        expect(name.textContent).toEqual(item.name);
        expect(city.textContent).toEqual(item.city);
        expect(zip_code.textContent).toEqual(item.zip_code);
    })
})