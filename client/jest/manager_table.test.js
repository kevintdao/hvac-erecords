import { render, fireEvent, cleanup, act } from "@testing-library/react"
import ManagerTable from "../components/managers/ManagerTable"

const labels = {
    text: ["Name", "Phone Number"],
    id: ["name", "phone_number"],
  };

const data = [
  {
    id: 1,
    name: "Unviersity of Iowa",
    phone_number: "+13191234567",
  }, {
    id: 2,
    name: "University of Illinois", 
    phone_number: "+13191244567"
  },
];

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<ManagerTable data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.map((item, index) => {
    const name = container.querySelector(`td#name-${item.id}`);
    const phoneNumber = container.querySelector(`td#phone_number-${item.id}`);

    expect(name.textContent).toEqual(item.name);
    expect(phoneNumber.textContent).toEqual(item.phone_number);
  })
})