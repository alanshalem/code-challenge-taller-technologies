import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Task from "./Task";

describe("Task Component", () => {
  const mockTask = {
    id: "1",
    title: "Test Task",
    completed: false,
  };

  it("renders task title", () => {
    render(<Task task={mockTask} onToggle={() => {}} />);
    expect(screen.getByText("Test Task")).toBeInTheDocument();
  });

  it("shows completed state with line-through", () => {
    const completedTask = { ...mockTask, completed: true };
    render(<Task task={completedTask} onToggle={() => {}} />);
    const title = screen.getByText("Test Task");
    expect(title).toHaveClass("line-through");
  });

  it("calls onToggle when clicked", async () => {
    const handleToggle = vi.fn();
    const user = userEvent.setup();

    render(<Task task={mockTask} onToggle={handleToggle} />);
    await user.click(screen.getByText("Test Task"));

    expect(handleToggle).toHaveBeenCalledWith("1");
  });
});
