import { render } from "@testing-library/react"
import NavBar from "../components/NavBar"
import { AppContext } from "../context/state"

test("Not logged in navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: null,
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );
  
  expect(wrapper.queryByText("Login")).toBeTruthy();
  expect(wrapper.queryByText("Sign Up")).toBeTruthy();
})

test("Logged in navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: '123adsf',
      refreshToken: '123asdf',
      isLoggedIn: true,
      user: {
        id: '1'
      },
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );

  expect(wrapper.queryByText("Sign Out")).toBeTruthy();
})

test("Maintenance company navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        role: 1
      },
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );
  const testData = [
    "Managers", "Buildings", "Tasks", "Profiles"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Building owner navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        role: 2
      },
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );
  const testData = [
    "Buildings", "Units"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Inspector navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        role: 4
      },
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );
  const testData = [
    "Data"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})

test("Technician navigation bar", () => {
  const contextValue = {
    data: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        role: 3
      },
      relog: false,
    }
  };
  const wrapper = render(
  <AppContext.Provider value={contextValue}>
    <NavBar />
  </AppContext.Provider>
  );
  const testData = [
    "Data", "Report"
  ];

  for(let i = 0; i < testData.length; i++){
    expect(wrapper.queryByText(testData[i])).toBeTruthy();
  }
})