import { render, fireEvent, cleanup, act } from "@testing-library/react"
import BuildingTable from "../components/buildings/BuildingTable"

const labels = {
    text: [ "Site Name", "City" ],
    id: [ "site_name", "city" ]
}

const data = [
    {
        id: 1,
        owner_id: 1,
        site_name: "Iowa",
        street: "123 Street",
        city: "Iowa City",
        zip_code: "52240",
        country: "United States"
    },
    {
        id: 2,
        owner_id: 1,
        site_name: "Iowa",
        street: "789 Street",
        city: "Iowa City",
        zip_code: "52242",
        country: "United States"
    }
]

afterEach(cleanup);

test("Should display preset table data", () => {
    const { container } =  render(<BuildingTable data={data} labels={labels}/>);

    labels.id.map((item, index) => {
        const element = container.querySelector(`th#${item}`);
        expect(element.textContent).toEqual(labels.text[index]);
    })

    data.map((item, index) => {
        const site_name = container.querySelector(`td#site_name-${item.id}`);
        const city = container.querySelector(`td#city-${item.id}`);

        expect(site_name.textContent).toEqual(item.site_name);
        expect(city.textContent).toEqual(item.city);
    })
})
