import { useEffect, useState } from "react";
import type { Task } from "../src/types/task";
import { getTasks, addTask, toggleTaskStatus } from "../src/api/taskAPI";
import TaskList from "../components/TaskList";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState<string>("");

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add task
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    try {
      const created = await addTask({
        title: newTaskTitle,
        completed: false,
      } as Task);
      setTasks((prev) => [...prev, created]);
      setNewTaskTitle("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add task");
    }
  };

  // Toggle task completion
  const handleToggleTask = async (id: string) => {
    try {
      const updated = await toggleTaskStatus(id);
      setTasks((prev) => prev.map((task) => (task.id === id ? updated : task)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg p-8">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-6xl font-black mb-8 text-white border-4 border-white bg-neo-dark p-6 shadow-[8px_8px_0px_0px_rgba(168,85,247,1)] transform hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_rgba(168,85,247,1)] transition-all">
          TASK LIST
        </h1>

        {/* Add Task */}
        <div className="flex gap-4 mb-8">
          <input
            className="flex-1 border-4 border-white bg-neo-dark text-white px-6 py-4 text-lg font-bold placeholder-gray-400 focus:outline-none focus:border-neo-accent focus:shadow-[4px_4px_0px_0px_rgba(168,85,247,1)] transition-all"
            type="text"
            placeholder="What needs to be done?"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            onClick={handleAddTask}
            className="bg-neo-purple border-4 border-white text-white px-8 py-4 font-black text-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] transition-all"
          >
            ADD
          </button>
        </div>

        {/* Task List */}
        <TaskList
          tasks={tasks}
          loading={loading}
          error={error}
          onToggle={handleToggleTask}
        />
      </div>
    </div>
  );
}
