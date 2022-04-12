import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import ServiceForm from '../components/service-visits/ServiceForm'

const data = [
  {
    "company": 1,
    "description": "",
    "id": 1,
    "rule": { "type": 'Text' },
    "title": "Record condition of condenser coil"
  },{
  "company": 1,
    "description": "record temperature of unit",
    "id": 2,
    "rule": {
      "options": {"max": '40', "min": '0'},
      "type": "Numeric"
    },
    "title": "Record temperature"
  },{
    "company": 1,
    "description": "change the filter and respond",
    "id": 3,
    "rule": {
      "options": {"1": 'Choice 1', "2": 'Choice 2'},
      "type": "Selection"
    },
    "title": "Change filter"
  }
]

afterEach(cleanup);

test('should watch input correctly', () => {
  const { container } = render(<ServiceForm data={data} name="service-visits" savedData={{"start_time":"2022-04-12T02:26:21Z"}}/>);
  const t1Textarea = container.querySelector("textarea#task-1");
  const t2Input = container.querySelector("input#task-2");
  const t3Choice1 = container.querySelector("input#task-3-1");
  const t3Choice2 = container.querySelector("input#task-3-2");

  fireEvent.input(t1Textarea, { target: { value: 'test' } });
  fireEvent.input(t2Input, { target: { value: 1 } });

  expect(t1Textarea.value).toEqual('test');
  expect(t2Input.value).toEqual('1');
})
