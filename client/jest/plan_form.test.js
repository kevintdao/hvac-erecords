import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import PlanForm from '../components/plans/PlanForm'

const profiles = [
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

test('should watch the input corectly', async () => {
  const { container } = render(<PlanForm profiles={profiles} />);
  const plannedCheckbox = container.querySelector("input#is-planned");
  const repeatingCheckbox = container.querySelector("input#is-repeating");
  const profileSelect = container.querySelector("select[id='profiles']");

  fireEvent.change(profileSelect, { target: { value: profiles[0].id } });
  await act(async () => { fireEvent.click(plannedCheckbox); });
  await act(async () => { fireEvent.click(repeatingCheckbox); });

  expect(profileSelect.value).toEqual((profiles[0].id).toString());
  expect(plannedCheckbox.checked).toEqual(true);
  expect(repeatingCheckbox.checked).toEqual(true);
})

test("should display error message when inputs are empty", async () => {
  const { container } = render(<PlanForm profiles={profiles} />);
  const plannedCheckbox = container.querySelector("input#is-planned");

  const assignButton = container.querySelector("button#assign-button");

  await act(async () => { fireEvent.click(plannedCheckbox); });
  await act(async () => { fireEvent.submit(assignButton); });

  const startInput = container.querySelector("input#start-date");
  const endInput = container.querySelector("input#end-date");
  const startError = container.querySelector("span#start-date-help");
  const endError = container.querySelector("span#end-date-help");

  expect(startInput.value.length).toEqual(0);
  expect(endInput.value.length).toEqual(0);
  expect(startError.textContent).toBe("Enter a Start Date");
  expect(endError.textContent).toBe("Enter an End Date");
})