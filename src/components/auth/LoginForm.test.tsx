// import { test, expect, vi } from "vitest";
// import { fireEvent, render, screen } from "@testing-library/react";

// import { LoginForm } from "./LoginForm";
// import { MemoryRouter } from "react-router";

// import { Toaster } from "../ui/sonner";

// global.ResizeObserver = class {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// };

// test.only("render login form", () => {
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={() => {}} loading={false} error={null} />
//     </MemoryRouter>
//   );
//   const loginForm = screen.getByTestId("login-form");
//   expect(loginForm).toBeInTheDocument();
// });

// test("has link to signup page", () => {
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={() => {}} loading={false} error={null} />
//     </MemoryRouter>
//   );
//   const signupLink = screen.getByRole("link", { name: /signup/i });
//   expect(signupLink).toBeInTheDocument();
//   expect(signupLink).toHaveAttribute("href", "/signup");
// });

// test("has link to forgot page", () => {
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={() => {}} loading={false} error={null} />
//     </MemoryRouter>
//   );
//   const forgotLink = screen.getByRole("link", { name: /forgot/i });
//   expect(forgotLink).toBeInTheDocument();
//   expect(forgotLink).toHaveAttribute("href", "/forgot");
// });

// test("submit with proper data", () => {
//   const onSubmit = vi.fn();
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={onSubmit} loading={false} error={null} />
//     </MemoryRouter>
//   );
//   const emailInput = screen.getByTestId("email-input");
//   const passwordInput = screen.getByTestId("password-input");
//   const submitButton = screen.getByRole("button", { name: /login/i });

//   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//   fireEvent.change(passwordInput, { target: { value: "password" } });

//   fireEvent.click(submitButton);

//   expect(onSubmit).toHaveBeenCalledWith("test@example.com", "password");
// });

// test("does not submit if fields are empty", () => {
//   const onSubmit = vi.fn();
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={onSubmit} loading={false} error={null} />
//     </MemoryRouter>
//   );

//   const submitButton = screen.getByRole("button", { name: /login/i });
//   fireEvent.click(submitButton);
//   expect(onSubmit).not.toHaveBeenCalled();
// });

// test("test for loading state", () => {
//   render(
//     <MemoryRouter>
//       <LoginForm onSubmit={() => {}} loading={true} error={null} />
//     </MemoryRouter>
//   );
//   const submitButton = screen.getByRole("button", { name: /login/i });
//   expect(submitButton).toBeDisabled();
// });

// test("test for error state", async () => {
//   window.matchMedia = vi.fn().mockImplementation(() => ({
//     matches: false,
//     addListener: () => {},
//     removeListener: () => {},
//     dispatchEvent: () => false,
//     addEventListener: () => {},
//     removeEventListener: () => {},
//   }));

//   render(
//     <MemoryRouter>
//       <Toaster />
//       <LoginForm
//         onSubmit={() => {}}
//         loading={false}
//         error={new Error("Invalid credentials")}
//       />
//     </MemoryRouter>
//   );

//   const toast = await screen.findByText("Invalid credentials");
//   expect(toast).toBeInTheDocument();
// });
