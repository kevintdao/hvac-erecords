import { render, fireEvent, cleanup, act } from "@testing-library/react"
import PlanTable from "../components/plans/PlanTable"

const labels = {
  text: ['Unit ID', 'Title', 'Is Planned', 'Repeat', 'Start Date', 'End Date'],
  id: ['unit-id', 'title', 'is-required', 'is-repeat', 'start-date', 'end-date']
}

const data = {
  "plan": [{
    "id": 1,
    "profile": 1,
    "unit": 1,
    "start_date": '2022-04-06',
    "end_date": '2022-04-06',
    "is_required": true,
    "is_repeating": true
  }],
  "profile": [{
    "id": 1,
    "title": "Profile 1",
    "description": "Desc 1",
    "tasks": [
      { "task_id": 1, "position": 1 }
    ]
  }]
}

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<PlanTable data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.plan.map((item, index) => {
    const title = container.querySelector(`td#title-${item.id}`);
    const start = container.querySelector(`td#start-date-${item.id}`);
    const end = container.querySelector(`td#end-date-${item.id}`);

    expect(title.textContent).toEqual(data.profile[index].title);
    expect(start.textContent).toEqual(item.start_date);
    expect(end.textContent).toEqual(item.end_date);
  })
})