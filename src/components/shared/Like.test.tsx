import { test, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import Like from "../shared/Like";

test("render like button", () => {
  render(<Like id={1} />);
  const likeBtn = screen.getByTestId("like-button");
  expect(likeBtn).toBeInTheDocument();
});

test("toggle like", () => {
  render(<Like id={1} />);
  const likeBtn = screen.getByTestId("like-button");
  fireEvent.click(likeBtn);
  expect(screen.getByTestId("like-bubble")).toBeInTheDocument();
  expect(likeBtn).toHaveClass("fill-red-500 text-red-500");

  fireEvent.click(likeBtn);
  expect(screen.getByTestId("like-bubble")).toBeInTheDocument();
  expect(likeBtn).not.toHaveClass("fill-red-500 text-red-500");
});
