import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";

describe("TaskList Component", () => {
  const mockTasks = [
    { id: "1", title: "Task 1", completed: false },
    { id: "2", title: "Task 2", completed: true },
  ];

  it("shows loading state", () => {
    render(
      <TaskList tasks={[]} loading={true} error={null} onToggle={() => {}} />
    );
    expect(screen.getByText("LOADING...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    render(
      <TaskList
        tasks={[]}
        loading={false}
        error="Network error"
        onToggle={() => {}}
      />
    );
    expect(screen.getByText(/ERROR: Network error/i)).toBeInTheDocument();
  });

  it("shows empty state when no tasks", () => {
    render(
      <TaskList tasks={[]} loading={false} error={null} onToggle={() => {}} />
    );
    expect(screen.getByText(/No tasks yet/i)).toBeInTheDocument();
  });

  it("renders list of tasks", () => {
    render(
      <TaskList
        tasks={mockTasks}
        loading={false}
        error={null}
        onToggle={() => {}}
      />
    );
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
