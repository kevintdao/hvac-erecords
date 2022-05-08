import { render, fireEvent, screen, cleanup, act } from "@testing-library/react"
import ResetPassword from "../pages/password-set/[uidb64]/[token]"

const input = {
    password: "password",
    confirmPasswordCorrect: "password",
    confirmPasswordIncorrect: "pass12354",
    emptyPassword: ""
}

afterEach(cleanup);

test("should watch input correctly" , () => {
    const { container } = render(<ResetPassword />);
    const passwordInput = container.querySelector('input#password');
    const confirmPasswordInput = container.querySelector('input#confirm_password');

    fireEvent.input(passwordInput, { target: { value: input.password } });
    fireEvent.input(confirmPasswordInput, { target: { value: input.confirmPasswordCorrect } });

    expect(passwordInput.value).toEqual(input.password);
    expect(confirmPasswordInput.value).toEqual(input.confirmPasswordCorrect);
})

test('should display error message when password and confirm password are not filled in', () => {
    const { container } = render(<ResetPassword />);
    const passwordInput = container.querySelector('input#password');
    const confirmPasswordInput = container.querySelector('input#confirm_password');

    const passwordError = container.querySelector("span#password-help");
    const confirmPasswordError = container.querySelector("span#password-help");

    fireEvent.input(passwordInput, {target: {value: input.emptyPassword }});
    fireEvent.input(confirmPasswordInput, {target: {value: input.emptyPassword }});
    expect(passwordError.textContent).toBe("Enter a Password");
    expect(confirmPasswordError.textContent).toBe("Enter a Password");
})

test('should display error when passwords do not match', () => {
    const { container } = render(<ResetPassword />);
    const passwordInput = container.querySelector('input#password');
    const confirmPasswordInput = container.querySelector('input#confirm_password');

    const confirmPasswordError = container.querySelector("span#password-help");

    fireEvent.input(passwordInput, {target: {value: input.password }});
    fireEvent.input(confirmPasswordInput, {target: {value: input.confirmPasswordIncorrect }});

    expect(confirmPasswordError.textContent).toBe("The passwords do not match");
})