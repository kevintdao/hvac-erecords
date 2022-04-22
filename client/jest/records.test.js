import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import UnitRecords from "../components/records/UnitRecords"

const data = {
  "id": 1,
  "external_id": "50030",
  "category": "Duct free",
  "serial_number": "AA000312341",
  "model_number": "AB412",
  "manufacturer": "Trane",
  "production_date": "2022-02-01",
  "installation_date": "2022-03-08",
  "building": {
      "site_name": "Seamans Center",
      "street": "103 South Capitol Street",
      "city": "Iowa City",
      "zip_code": "52242",
      "country": "United States"
  },
  "visits": {
    "2": {
      "id": 2,
      "technician": 1,
      "start_time": "2022-04-18T16:46:29Z",
      "end_time": "2022-04-18T16:47:39Z",
      "plan": 1
    }
  },
  "task_completions": {
    "1": {
      "id": 1,
      "task_id": 2,
      "task_title": "Record temperature",
      "task_description": "Record temperature of unit",
      "completed_at": "2022-04-18T16:47:17Z",
      "selection": null,
      "response": "",
      "value": 20.0,
      "visit": 2,
      "task_rule": {
        "type": "Numeric",
      }
    },
    "2": {
      "id": 2,
      "task_id": 3,
      "task_title": "Check if filter needs to be changed",
      "task_description": "check if the filter needs to be changed",
      "completed_at": "2022-04-18T16:47:38Z",
      "selection": 1,
      "response": "",
      "value": null,
      "visit": 2,
      "task_rule": {
        "type": "Selection",
        "options": {
          "1": "OK",
          "2": "Need actions"
        }
      }
    },
    "3": {
      "id": 3,
      "task_id": 1,
      "task_title": "Record condition of condenser coil",
      "task_description": "",
      "completed_at": "2022-04-18T16:46:57Z",
      "selection": null,
      "response": "Good condition",
      "value": null,
      "visit": 2,
      "task_rule": {
        "type": "Text",
      }
    }
  },
  "technicians": {
    "1": {
      "id": 1,
      "first_name": "Bob",
      "last_name": "Smith",
      "license_number": 131251003,
      "affiliation": "HVAC Company #1"
    }
  },
  "plans": {
    "1": {
      "id": 1,
      "profile_id": 1,
      "profile_title": "Routine Maintenance for AC Units",
      "profile_description": "this is a list of tasks for maintenance of an air conditioner",
      "start_date": "2022-03-08",
      "end_date": "2022-06-08",
      "is_required": true,
      "is_repeating": true
    }
  }
}

afterEach(cleanup);

test('should display the data', () => {
  const { container } = render(<UnitRecords data={data} unitId={1}/>);

  expect(container.querySelector('#visit-2').textContent).toEqual('Visit 2');
  expect(container.querySelector('#visit-2-start').textContent).toEqual('Start time: 4/18/2022, 4:46:29 PM UTC');
  expect(container.querySelector('#visit-2-end').textContent).toEqual('End time: 4/18/2022, 4:47:39 PM UTC');

  expect(container.querySelector('#plan-2-title').textContent).toEqual('Title: Routine Maintenance for AC Units');
  expect(container.querySelector('#plan-2-desc').textContent).toEqual('Description: this is a list of tasks for maintenance of an air conditioner');
  
  expect(container.querySelector('#tech-2-fname').textContent).toEqual('First name: Bob');
  expect(container.querySelector('#tech-2-lname').textContent).toEqual('Last name: Smith');
  expect(container.querySelector('#tech-2-company').textContent).toEqual('Affiliation: HVAC Company #1');
  expect(container.querySelector('#tech-2-license').textContent).toEqual('License number: 131251003');
})