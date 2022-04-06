import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TaskDetails from "../components/tasks/TaskDetails"

const numericData = {
  title: "Title",
  description: "Description",
  rule: {
    type: "Numeric",
    options: {
      min: "1",
      max: "10"
    }
  }
}

const selectionData = {
  title: "Title",
  description: "Description",
  rule: {
    type: "Selection",
    options: {
      "1": "Choice 1",
      "2": "Choice 2",
      "choices": 2
    }
  }
}

const textData = {
  title: "Title",
  description: "Description",
  rule: {
    type: "Text"
  }
}

afterEach(cleanup);

test('should display the data for numeric type', () => {
  const { container } = render(<TaskDetails data={numericData}/>);
  const title = container.querySelector("dd#title");
  const description = container.querySelector("dd#description");
  const type = container.querySelector("dd#type");
  const min = container.querySelector("dd#min");
  const max = container.querySelector("dd#max");

  expect(title.textContent).toEqual(numericData.title);
  expect(description.textContent).toEqual(numericData.description);
  expect(type.textContent).toEqual(numericData.rule.type);
  expect(min.textContent).toEqual(numericData.rule.options.min);
  expect(max.textContent).toEqual(numericData.rule.options.max);
})

test('should display the data for selection type', () => {
  const { container } = render(<TaskDetails data={selectionData}/>);
  const title = container.querySelector("dd#title");
  const description = container.querySelector("dd#description");
  const type = container.querySelector("dd#type");
  const c1 = container.querySelector("dd#choice1");
  const c2 = container.querySelector("dd#choice2");

  expect(title.textContent).toEqual(selectionData.title);
  expect(description.textContent).toEqual(selectionData.description);
  expect(type.textContent).toEqual(selectionData.rule.type);
  expect(c1.textContent).toEqual(selectionData.rule.options['1']);
  expect(c2.textContent).toEqual(selectionData.rule.options['2']);
})

test('should display the data for text type', () => {
  const { container } = render(<TaskDetails data={textData}/>);
  const title = container.querySelector("dd#title");
  const description = container.querySelector("dd#description");
  const type = container.querySelector("dd#type");

  expect(title.textContent).toEqual(textData.title);
  expect(description.textContent).toEqual(textData.description);
  expect(type.textContent).toEqual(textData.rule.type);
})