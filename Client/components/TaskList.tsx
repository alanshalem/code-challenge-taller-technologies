import type { Task } from "../src/types/task";
import TaskComponent from "./Task";

interface Props {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string) => void;
}

export default function TaskList({ tasks, loading, error, onToggle }: Props) {
  if (loading) {
    return (
      <div className="bg-neo-blue border-4 border-white p-8 text-center font-black text-2xl text-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
        LOADING...
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-neo-red border-4 border-white p-8 text-center font-black text-xl text-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.3)]">
        ERROR: {error}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-neo-dark border-4 border-white p-8 text-center font-bold text-xl text-gray-400 shadow-[6px_6px_0px_0px_rgba(168,85,247,0.5)]">
        No tasks yet. Add one above!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} onToggle={onToggle} />
      ))}
    </div>
  );
}
