import { Todo, TodoCreate, TodoUpdate } from "@/types/todo";

const API_BASE_URL = "http://localhost:8000/api/v1";

export const getTodos = async (): Promise<Todo[]> => {
  const res = await fetch(`${API_BASE_URL}/todos/`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
};

export const createTodo = async (todo: TodoCreate): Promise<Todo> => {
  const res = await fetch(`${API_BASE_URL}/todos/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error("Failed to create todo");
  }
  return res.json();
};

export const updateTodo = async (
  id: number,
  todo: TodoUpdate
): Promise<Todo> => {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  if (!res.ok) {
    throw new Error("Failed to update todo");
  }
  return res.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const res = await fetch(`${API_BASE_URL}/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }
};
