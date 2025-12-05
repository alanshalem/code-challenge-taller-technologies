import axios from "axios";
import type { Task } from "../types/task";

const API_URL = "http://localhost:5120/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data;
};

export const addTask = async (task: Task): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data;
};

export const toggleTaskStatus = async (id: string): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`);
  return response.data;
};
