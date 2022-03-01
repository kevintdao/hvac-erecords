import { render } from "@testing-library/react"
import NavBar from "../components/NavBar"

test("Not logged in navigation bar", () => {
  const wrapper = render(<NavBar />);
  expect(wrapper.queryByText("Login")).toBeTruthy();
  expect(wrapper.queryByText("Sign Up")).toBeTruthy();
})

test("Logged in navigation bar", () => {
  const wrapper = render(<NavBar loggedIn />);
  expect(wrapper.queryByTestId("menu-button")).toBeTruthy();
})

test("Maintenance company navigation bar", () => {
  const wrapper = render(<NavBar role="Maintenance Company" />);
  const testData = [
    "Manage", "Units", "Users"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Building owner navigation bar", () => {
  const wrapper = render(<NavBar role="Building Owner" />);
  const testData = [
    "Data"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Inspector navigation bar", () => {
  const wrapper = render(<NavBar role="Inspector" />);
  const testData = [
    "Data"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Technician navigation bar", () => {
  const wrapper = render(<NavBar role="Technician" />);
  const testData = [
    "Data", "Report"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})