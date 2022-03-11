import { render, fireEvent, cleanup, act } from "@testing-library/react"
import UnitTable from "../components/units/UnitTable"

const labels = {
  text: ["External ID", "Model Number", "Serial Number", "Type", "Manufacturer"],
  id: ["id", "model", "serial", "category", "manufacturer"],
};
const data = [
  {
    id: 1,
    external_id: "12345",
    model_number: "12345",
    serial_number: "ABC123",
    category: "Duct free",
    manufacturer: "Test",
  }, {
    id: 2,
    external_id: "test",
    model_number: "test",
    serial_number: "adsf456",
    category: "Heating and cooling split system",
    manufacturer: "manufacturer",
  },
];

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<UnitTable data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.map((item, index) => {
    const id = container.querySelector(`td#ex-id-${item.id}`);
    const model = container.querySelector(`td#model-${item.id}`);
    const serial = container.querySelector(`td#serial-${item.id}`);
    const type = container.querySelector(`td#category-${item.id}`);
    const manufacturer = container.querySelector(`td#manufacturer-${item.id}`);

    expect(id.textContent).toEqual(item.external_id);
    expect(model.textContent).toEqual(item.model_number);
    expect(serial.textContent).toEqual(item.serial_number);
    expect(type.textContent).toEqual(item.category);
    expect(manufacturer.textContent).toEqual(item.manufacturer);
  })
})