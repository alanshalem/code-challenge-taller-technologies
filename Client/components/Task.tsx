import type { Task } from "../src/types/task";

interface Props {
  task: Task;
  onToggle: (id: string) => void;
}

export default function Task({ task, onToggle }: Props) {
  return (
    <div
      className={`
        border-4 p-6
        hover:-translate-y-0.5
        transition-all
        cursor-pointer
        ${task.completed
          ? 'border-neo-green bg-neo-dark shadow-[4px_4px_0px_0px_rgba(16,185,129,0.8)] hover:shadow-[6px_6px_0px_0px_rgba(16,185,129,1)]'
          : 'border-white bg-neo-card shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] hover:shadow-[6px_6px_0px_0px_rgba(168,85,247,0.8)]'
        }
      `}
      onClick={() => onToggle(task.id)}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-8 h-8 border-4 flex items-center justify-center font-black text-xl
          ${task.completed
            ? 'border-neo-green bg-neo-green text-neo-dark'
            : 'border-white bg-neo-dark text-white'
          }
        `}>
          {task.completed && '✓'}
        </div>
        <span className={`
          font-bold text-lg
          ${task.completed ? 'line-through opacity-60 text-gray-400' : 'text-white'}
        `}>
          {task.title}
        </span>
      </div>
    </div>
  );
}
