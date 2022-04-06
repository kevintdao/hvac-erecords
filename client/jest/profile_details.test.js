import { render, fireEvent, cleanup, act } from "@testing-library/react"
import ProfileDetails from "../components/profiles/ProfileDetails"

const data = {
  profile: {
    "id": 1,
    "title": "Profile 1",
    "description": "Desc 1",
    "tasks": [
      { "task_id": 1, "position": 1 }
    ]
  },
  tasks: [
    {
      "id": 1,
      "company": 1,
      "title": "Numeric Task",
      "description": "Description",
      "rule": {
        "type": "Numeric",
        "options": {
          "min": 1,
          "max": 10
        }
      }
    }
  ]
}

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<ProfileDetails data={data}/>);
  const title = container.querySelector("dd#title");
  const description = container.querySelector("dd#description");
  const numTasks = container.querySelector("dd#num-tasks");

  expect(title.textContent).toEqual(data.profile.title);
  expect(description.textContent).toEqual(data.profile.description);
  expect(numTasks.textContent).toEqual(data.tasks.length.toString());
})