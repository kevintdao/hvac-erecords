import { render, fireEvent, cleanup, act } from "@testing-library/react"
import UnitDetails from "../components/units/UnitDetails"

const data = {
  external_id: "12345",
  model_number: "12345",
  serial_number: "ABC123",
  category: "Duct free",
  manufacturer: "Test",
  production_date: "2022-03-09",
  installation_date: "2022-03-09",
}

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<UnitDetails data={data}/>);
  const id = container.querySelector("dd#external_id");
  const model = container.querySelector("dd#model_number");
  const serial = container.querySelector("dd#serial_number");
  const type = container.querySelector("dd#category");
  const manufacturer = container.querySelector("dd#manufacturer");
  const prodDate = container.querySelector("dd#production_date");
  const installDate = container.querySelector("dd#installation_date");

  expect(id.textContent).toEqual(data.external_id);
  expect(model.textContent).toEqual(data.model_number);
  expect(serial.textContent).toEqual(data.serial_number);
  expect(type.textContent).toEqual(data.category);
  expect(manufacturer.textContent).toEqual(data.manufacturer);
  expect(prodDate.textContent).toEqual(data.production_date);
  expect(installDate.textContent).toEqual(data.installation_date);
})