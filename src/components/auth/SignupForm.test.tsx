import { test, expect, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router";
import { Toaster } from "../ui/sonner";
import SignupForm from "./SignupForm";

global.ResizeObserver = vi.fn().mockImplementation(() => {
  return {
    observe() {},
    unobserve() {},
    disconnect() {},
  };
});
window.matchMedia = vi.fn().mockImplementation(() => {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
    addEventListener: () => {},
    removeEventListener: () => {},
  };
});

test("render signup form", () => {
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm onSubmit={() => {}} loading={false} error={null} />
    </MemoryRouter>
  );
  const signupForm = screen.getByTestId("signup-form");
  expect(signupForm).toBeInTheDocument();
});

test("should have error on password mismatch", async () => {
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm onSubmit={() => {}} loading={false} error={null} />
    </MemoryRouter>
  );
  const submitButton = screen.getByTestId("signup-button");
  const confirmPasswordInput = screen.getByTestId("confirm-password-input");
  fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
  const error = await screen.findByText("Password Mismatch");
  expect(error).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

test("test loading state", () => {
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm onSubmit={() => {}} loading={true} error={null} />
    </MemoryRouter>
  );
  const submitButton = screen.getByTestId("signup-button");
  expect(submitButton).toBeDisabled();
});

test("test error state", async () => {
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm
        onSubmit={() => {}}
        loading={false}
        error={new Error("Invalid credentials")}
      />
    </MemoryRouter>
  );
  const error = await screen.findByText("Invalid credentials");
  expect(error).toBeInTheDocument();
});

test("should not call onSubmit if form is empty", () => {
  const onSubmit = vi.fn();
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm onSubmit={onSubmit} loading={false} error={null} />
    </MemoryRouter>
  );
  const submitButton = screen.getByTestId("signup-button");
  fireEvent.click(submitButton);
  expect(onSubmit).not.toHaveBeenCalled();
});

test("should call onSubmit with proper data", () => {
  const onSubmit = vi.fn();
  render(
    <MemoryRouter>
      <Toaster />
      <SignupForm onSubmit={onSubmit} loading={false} error={null} />
    </MemoryRouter>
  );
  const nameInput = screen.getByTestId("full-name-input");
  const emailInput = screen.getByTestId("email-input");
  const passwordInput = screen.getByTestId("password-input");
  const confirmPasswordInput = screen.getByTestId("confirm-password-input");
  const termsService = screen.getByTestId("terms-service");
  const submitButton = screen.getByTestId("signup-button");

  fireEvent.change(nameInput, { target: { value: "test" } });
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "password" } });
  fireEvent.click(termsService);
  fireEvent.click(submitButton);

  expect(onSubmit).toHaveBeenCalledWith("test@example.com", "password");
});
