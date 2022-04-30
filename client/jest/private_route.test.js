import { render, fireEvent, cleanup, act } from "@testing-library/react"
import PrivateRoute from "../components/PrivateRoute"
import { AppContext } from "../context/state"
import Login from '../components/Login'

afterEach(cleanup);

test('Allowed role', () => {
  const contextValue = {
    user: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        id: 1,
        role: 'company'
      },
      relog: false,
    }
  }

  const { container } = render(
    <AppContext.Provider value={contextValue}>
      <PrivateRoute isAllowed={['company']}>
        <Login />
      </PrivateRoute>
    </AppContext.Provider>
  );
  expect(container.querySelector("input#email")).toBeTruthy();
})

test('Not allowed role', () => {
  const contextValue = {
    user: {
      accessToken: null,
      refreshToken: null,
      isLoggedIn: false,
      user: {
        id: 1,
        role: 'technician'
      },
      relog: false,
    }
  }

  const wrapper = render(
    <AppContext.Provider value={contextValue}>
      <PrivateRoute isAllowed={['company']}>
        <Login />
      </PrivateRoute>
    </AppContext.Provider>
  );
  expect(wrapper.queryByText("You don't have access to this page")).toBeTruthy();
  expect(wrapper.container.querySelector("input#email")).toBeFalsy();
})