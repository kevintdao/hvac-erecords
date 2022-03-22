import { render, fireEvent, cleanup, act } from "@testing-library/react"
import ManagerDetails from "../components/managers/ManagerDetails"

const data = {
  name: "12345",
  phone_number: "(319) 123-4567"
}

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<ManagerDetails data={data}/>);
  const name = container.querySelector("dd#name");
  const phoneNumber = container.querySelector("dd#phone_number");

  expect(name.textContent).toEqual(data.name);
  expect(phoneNumber.textContent).toEqual(data.phone_number);
})