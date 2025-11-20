"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTodos, updateTodo, deleteTodo } from "@/lib/api";
import { Todo } from "@/types/todo";

export default function TodoList() {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      updateTodo(id, { completed }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <div className="text-center p-4">Loading todos...</div>;
  if (error) return <div className="text-red-500 p-4">Error loading todos</div>;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Tasks</h2>
      <ul className="space-y-3">
        {todos?.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow transition-all hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={(e) =>
                  updateMutation.mutate({
                    id: todo.id,
                    completed: e.target.checked,
                  })
                }
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-800 dark:text-gray-200"
                }`}
              >
                {todo.title}
              </span>
            </div>
            <button
              onClick={() => deleteMutation.mutate(todo.id)}
              className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              aria-label="Delete todo"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </li>
        ))}
        {todos?.length === 0 && (
          <p className="text-center text-gray-500 mt-4">
            No tasks yet. Add one above!
          </p>
        )}
      </ul>
    </div>
  );
}
