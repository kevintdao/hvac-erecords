import { render, fireEvent, cleanup, act } from "@testing-library/react"
import OtherPlans from "../components/service-plans/OtherPlans"

const labels = {
  text: ['Title', 'Repeat', 'Start Date', 'End Date'],
  id: ['title', 'is-repeat', 'start-date', 'end-date']
}

const data = [
  {
    "end_date": "2022-06-08",
    "id": 1,
    "is_repeating": true,
    "is_required": true,
    "profile": 1,
    "start_date": "2022-03-08",
    "unit": 1
  }
]

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<OtherPlans data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.map((item, index) => {
    const start = container.querySelector(`td#start-date-${item.id}`);
    const end = container.querySelector(`td#end-date-${item.id}`);

    expect(start.textContent).toEqual(item.start_date);
    expect(end.textContent).toEqual(item.end_date);
  })
})