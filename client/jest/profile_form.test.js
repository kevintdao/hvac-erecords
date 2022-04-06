import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import ProfileForm from '../components/profiles/ProfileForm'

const input = {
  title: "Check refrigerant level",
  description: "Report a value based response for refrigerant level",
}

const tasks = [
  {
    "id": 1,
    "company": 1,
    "title": "Selection Task",
    "description": "Description",
    "rule": {
      "type": "Selection",
      "options": {
        "1": "Choice 1",
        "2": "Choice 2",
        "choices": 2
      }
    }
  },
  {
    "id": 2,
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

afterEach(cleanup);

test('should watch the input corectly', () => {
  const { container } = render(<ProfileForm type="Create" tasks={tasks} />);
  const titleInput = container.querySelector("input#title");
  const descriptionInput = container.querySelector("textarea#description");
  const tasks0 = container.querySelector("select[id='tasks.t0']");

  fireEvent.input(titleInput, { target: { value: input.title } });
  fireEvent.input(descriptionInput, { target: { value: input.description } });
  fireEvent.change(tasks0, { target: { value: tasks[0].id } });

  expect(titleInput.value).toEqual(input.title);
  expect(descriptionInput.value).toEqual(input.description);
  expect(tasks0.value).toEqual((tasks[0].id).toString());
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<ProfileForm type="Create" tasks={tasks} />);
  const titleInput = container.querySelector("input#title");
  const descriptionInput = container.querySelector("textarea#description");

  const titleError = container.querySelector("span#title-help");
  const descriptionError = container.querySelector("span#description-help");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(titleInput.value.length).toEqual(0);
  expect(descriptionInput.value.length).toEqual(0);
  expect(titleError.textContent).toBe("Enter a title");
  expect(descriptionError.textContent).toBe("Enter a description");
})

test("should add a new task", async () => {
  const { container } = render(<ProfileForm type="Create" tasks={tasks} />);
  const addButton = container.querySelector("button#add-task");
  const tasks0 = container.querySelector("select[id='tasks.t0']");

  fireEvent.change(tasks0, { target: { value: tasks[1].id } });
  await act(async () => { fireEvent.click(addButton); });

  const tasks1 = container.querySelector("select[id='tasks.t1']");
  expect(tasks0.value).toEqual((tasks[1].id).toString());
  expect(tasks1.value).toEqual((tasks[0].id).toString());
})

test("should display delete button when there are at least 2 tasks", async () => {
  const { container } = render(<ProfileForm type="Create" tasks={tasks} />);
  const addButton = container.querySelector("button#add-task");

  expect(container.querySelector('button#delete0')).toBeFalsy();

  await act(async () => { fireEvent.click(addButton); });

  expect(container.querySelector('button#delete0')).toBeTruthy();
  expect(container.querySelector('button#delete1')).toBeTruthy();
})

test("should remove a task", async () => {
  const { container } = render(<ProfileForm type="Create" tasks={tasks} />);
  const addButton = container.querySelector("button#add-task");

  await act(async () => { fireEvent.click(addButton); });

  let tasks0 = container.querySelector("select[id='tasks.t0']");
  let tasks1 = container.querySelector("select[id='tasks.t1']");
  let delete0 = container.querySelector('button#delete0');
  let delete1 = container.querySelector('button#delete1');

  await act(async () => { fireEvent.click(delete1); });

  expect(container.querySelector('button#delete0')).toBeFalsy();
  expect(container.querySelector("select[id='tasks.t1']")).toBeFalsy();
  expect(container.querySelector('button#delete1')).toBeFalsy();
})