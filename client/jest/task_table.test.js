import { render, fireEvent, cleanup, act } from "@testing-library/react"
import TaskTable from "../components/tasks/TaskTable"

const labels = {
    text: ["Title", "Type"],
    id: ["title", "type"],
  };

const data = [
  {
    id: 1,
    title: "Title 1",
    rule: {
      type: "Selection"
    }
  }, {
    id: 2,
    title: "Title 2", 
    rule: {
      type: "Numeric"
    }
  },
];

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<TaskTable data={data} labels={labels}/>);

  labels.id.map((item, index) => {
    const element = container.querySelector(`th#${item}`);
    expect(element.textContent).toEqual(labels.text[index]);
  });

  data.map((item, index) => {
    const title = container.querySelector(`td#title-${item.id}`);
    const type = container.querySelector(`td#type-${item.id}`);

    expect(title.textContent).toEqual(item.title);
    expect(type.textContent).toEqual(item.rule.type);
  })
})