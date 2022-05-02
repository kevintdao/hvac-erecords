import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import UnitForm from "../components/units/UnitForm"

const input = {
  building: {
    city: "Iowa City",
    country: "United States",
    id: 1,
    manager: 1,
    site_name: "Seamans Center",
    street: "103 South Capitol Street",
    zip_code: "52242"
  },
  external_id: "12345",
  model_number: "12345",
  serial_number: "ABC123",
  category: "Duct free",
  manufacturer: "Test",
  production_date: "2022-03-09",
  installation_date: "2022-03-09",
}

const buildings = [{
  "id": 1,
  "owner_id": 1,
  "site_name": "Iowa",
  "street": "123 Street",
  "city": "Iowa City",
  "zip_code": "52240",
  "country": "United States"
}]


afterEach(cleanup);

test('should watch input correctly', () => {
  const { container } = render(<UnitForm buildings={buildings} type="Create"/>);
  const idInput = container.querySelector("input#external_id");
  const modelInput = container.querySelector("input#model_number");
  const serialInput = container.querySelector("input#serial_number");
  const typeInput = container.querySelector("select#category");
  const manufacturerInput = container.querySelector("input#manufacturer");
  const prodDateInput = container.querySelector("input#production_date");
  const installDateInput = container.querySelector("input#installation_date");

  fireEvent.input(idInput, { target: { value: input.external_id } });
  fireEvent.input(modelInput, { target: { value: input.model_number } });
  fireEvent.input(serialInput, { target: { value: input.serial_number } });
  fireEvent.change(typeInput, { target: { value: input.category } });
  fireEvent.input(manufacturerInput, { target: { value: input.manufacturer } });
  fireEvent.input(prodDateInput, { target: { value: input.production_date } });
  fireEvent.input(installDateInput, { target: { value: input.installation_date } });

  expect(idInput.value).toEqual(input.external_id);
  expect(modelInput.value).toEqual(input.model_number);
  expect(serialInput.value).toEqual(input.serial_number);
  expect(typeInput.value).toEqual(input.category);
  expect(manufacturerInput.value).toEqual(input.manufacturer);
  expect(prodDateInput.value).toEqual(input.production_date);
  expect(installDateInput.value).toEqual(input.installation_date);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<UnitForm buildings={buildings} type="Create"/>);
  const idInput = container.querySelector("input#external_id");
  const modelInput = container.querySelector("input#model_number");
  const serialInput = container.querySelector("input#serial_number");
  const typeInput = container.querySelector("select#category");
  const manufacturerInput = container.querySelector("input#manufacturer");
  const prodDateInput = container.querySelector("input#production_date");
  const installDateInput = container.querySelector("input#installation_date");

  const modelError = container.querySelector("span#model_number-help");
  const serialError = container.querySelector("span#serial_number-help");
  const manufacturerError = container.querySelector("span#manufacturer-help");
  const prodDateError = container.querySelector("span#production_date-help");
  const installDateError = container.querySelector("span#installation_date-help");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(modelInput.value.length).toEqual(0);
  expect(serialInput.value.length).toEqual(0);
  expect(manufacturerInput.value.length).toEqual(0);
  expect(prodDateInput.value.length).toEqual(0);
  expect(installDateInput.value.length).toEqual(0);
  expect(modelError.textContent).toBe("Enter a Model Number");
  expect(serialError.textContent).toBe("Enter a Serial Number");
  expect(manufacturerError.textContent).toBe("Enter a Manufacturer");
  expect(prodDateError.textContent).toBe("Enter a Production Date");
  expect(installDateError.textContent).toBe("Enter an Installation Date");
})