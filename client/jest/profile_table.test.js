import { render, fireEvent, cleanup, act } from "@testing-library/react"
import ProfileTable from "../components/profiles/ProfileTable"

const labels = {
  text: ["Title", "Number of Tasks"],
  id: ["title", "num-tasks"],
};

const data = [
  {
    "id": 1,
    "title": "Profile 1",
    "description": "Desc 1",
    "tasks": [
      { "task_id": 1, "position": 1 }
    ]
  },
  {
    "id": 2,
    "title": "Profile 2",
    "description": "Desc 2",
    "tasks": [
      { "task_id": 1, "position": 1 }
    ]
  }
]

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<ProfileTable data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.map((item, index) => {
    const title = container.querySelector(`td#title-${item.id}`);
    const numTasks = container.querySelector(`td#num-tasks-${item.id}`);

    expect(title.textContent).toEqual(item.title);
    expect(numTasks.textContent).toEqual(item.tasks.length.toString());
  })
})