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
  const descriptionInput = container.querySelector("textarea#description");

  fireEvent.input(titleInput, { target: { value: input.title } });
  fireEvent.input(descriptionInput, { target: { value: input.description } });

  expect(titleInput.value).toEqual(input.title);
  expect(descriptionInput.value).toEqual(input.description);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<TaskForm type="Create" />);
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

test("should render different components based on type", async () => {
  const { container } = render(<TaskForm type="Create" />);
  const typeSelect = container.querySelector("select#type");

  fireEvent.change(typeSelect, { target: { value: 'Selection' } });
  expect(container.querySelector("input#min")).toBeFalsy();
  expect(container.querySelector("input#max")).toBeFalsy();
  expect(container.querySelector("input#choices")).toBeTruthy();

  fireEvent.change(typeSelect, { target: { value: 'Numeric' } });
  expect(container.querySelector("input#min")).toBeTruthy();
  expect(container.querySelector("input#max")).toBeTruthy();
  expect(container.querySelector("input#choices")).toBeFalsy();

  fireEvent.change(typeSelect, { target: { value: 'Text' } });
  expect(container.querySelector("input#min")).toBeFalsy();
  expect(container.querySelector("input#max")).toBeFalsy();
  expect(container.querySelector("input#choices")).toBeFalsy();
})

test('should display the correct number of options for selection type', async () => {
  const { container } = render(<TaskForm type="Create" />);
  const typeSelect = container.querySelector("select#type");

  fireEvent.change(typeSelect, { target: { value: 'Selection' } });
  const choicesRange = container.querySelector("input#choices");

  let value = 5;
  fireEvent.change(choicesRange, { target: { value: value } });
  expect(choicesRange.value).toBe("5");
  
  for(let i = 1; i <= value; i++){
    expect(container.querySelector(`input[name='selection.c${i}']`)).toBeTruthy()
  }

  value = 3;
  fireEvent.change(choicesRange, { target: { value: value } });
  expect(choicesRange.value).toBe("3");
  
  for(let i = 1; i <= value; i++){
    expect(container.querySelector(`input[name='selection.c${i}']`)).toBeTruthy()
  }
})

test('should display error message when fields for Selection type is empty', async () => {
  const { container } = render(<TaskForm type="Create" />);
  const typeSelect = container.querySelector("select#type");

  fireEvent.change(typeSelect, { target: { value: 'Selection' } });

  const choicesRange = container.querySelector("input#choices");

  let value = 5;
  fireEvent.change(choicesRange, { target: { value: value } });
  expect(choicesRange.value).toBe("5");

  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  for(let i = 1; i <= value; i++){
    const choiceInput = container.querySelector(`input[name='selection.c${i}']`)
    const choiceError = container.querySelector(`[id='${i}-help']`)
    expect(choiceInput.value.length).toEqual(0);
    expect(choiceError.textContent).toBe(`Enter a value for choice-${i}`);
  }
})

test('should display error message when fields for Numeric type is empty', async () => {
  const { container } = render(<TaskForm type="Create" />);
  const typeSelect = container.querySelector("select#type");

  fireEvent.change(typeSelect, { target: { value: 'Numeric' } });

  const minInput = container.querySelector("input#min");
  const maxInput = container.querySelector("input#max");
  const minError = container.querySelector("span#min-help");
  const maxError = container.querySelector("span#max-help");
  
  const createButton = container.querySelector("button#create-button");

  await act(async () => { fireEvent.submit(createButton); });

  expect(minInput.value.length).toEqual(0);
  expect(maxInput.value.length).toEqual(0);
  expect(minError.textContent).toBe("Enter a minimum value");
  expect(maxError.textContent).toBe("Enter a maximum value");
})