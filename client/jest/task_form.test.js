import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import TaskForm from '../components/tasks/TaskForm'

const input = {
  title: "Check refrigerant level",
  description: "Report a value based response for refrigerant level",
}

afterEach(cleanup);

test('should watch input correctly', () => {
  const { container } = render(<TaskForm type="Create" />);
  const titleInput = container.querySelector("input#title");
  const descriptionInput = container.querySelector("input#description");

  fireEvent.input(titleInput, { target: { value: input.title } });
  fireEvent.input(descriptionInput, { target: { value: input.description } });

  expect(titleInput.value).toEqual(input.title);
  expect(descriptionInput.value).toEqual(input.description);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<TaskForm type="Create" />);
  const titleInput = container.querySelector("input#title");
  const descriptionInput = container.querySelector("input#description");

  const titleError = container.querySelector("span#title-help");
  const descriptionError = container.querySelector("span#description-help");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(titleInput.value.length).toEqual(0);
  expect(descriptionInput.value.length).toEqual(0);
  expect(titleError.textContent).toBe("Enter a title");
  expect(descriptionError.textContent).toBe("Enter a description");
})

test("should render different components based on type", async () => {
  const { container } = render(<TaskForm type="Create" />);
  const typeSelect = container.querySelector("select#type");

  fireEvent.change(typeSelect, { target: { value: 'Selection' } });
  expect(container.querySelector("input#min")).toBeFalsy();
  expect(container.querySelector("input#max")).toBeFalsy();
  expect(container.querySelector("input#choices")).toBeTruthy();

  fireEvent.change(typeSelect, { target: { value: 'Numberic' } });
  expect(container.querySelector("input#min")).toBeTruthy();
  expect(container.querySelector("input#max")).toBeTruthy();
  expect(container.querySelector("input#choices")).toBeFalsy();

  fireEvent.change(typeSelect, { target: { value: 'Text' } });
  expect(container.querySelector("input#min")).toBeFalsy();
  expect(container.querySelector("input#max")).toBeFalsy();
  expect(container.querySelector("input#choices")).toBeFalsy();
})