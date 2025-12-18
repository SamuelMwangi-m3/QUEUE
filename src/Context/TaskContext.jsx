import React, { createContext, useReducer, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from "react-toastify";

// Define task actions
export const ACTIONS = {
  ADD_TASK: "ADD_TASK",
  TOGGLE_TASK: "TOGGLE_TASK",
  DELETE_TASK: "DELETE_TASK",
  EDIT_TASK: "EDIT_TASK",
  SET_FILTER: "SET_FILTER",
  SET_CATEGORY_FILTER: "SET_CATEGORY_FILTER",
  REORDER_TASKS: "REORDER_TASKS",
  SET_THEME: "SET_THEME",
};

// Initial state
const initialState = {
  tasks: [],
  filter: "All",
  categoryFilter: "All",
  theme: "light",
};

// Reducer function
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return { ...state, tasks: [...state.tasks, action.payload] };

    case ACTIONS.TOGGLE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, completed: !task.completed }
            : task
        ),
      };

    case ACTIONS.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };

    case ACTIONS.EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload.updates } : task
        ),
      };

    case ACTIONS.SET_FILTER:
      return { ...state, filter: action.payload };

    case ACTIONS.SET_CATEGORY_FILTER:
      return { ...state, categoryFilter: action.payload };

    case ACTIONS.REORDER_TASKS:
      return { ...state, tasks: action.payload };

    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };

    default:
      return state;
  }
}

export const TaskContext = createContext();

// Provider component
export function TaskProvider({ children }) {
  const [storedTasks, setStoredTasks] = useLocalStorage("tasks", []);
  const [state, dispatch] = useReducer(reducer, { ...initialState, tasks: storedTasks });

  // Persist tasks to localStorage
  useEffect(() => {
    setStoredTasks(state.tasks);
  }, [state.tasks]);

  // Notifications for tasks due within 1 hour
  useEffect(() => {
    state.tasks.forEach((task) => {
      if (!task.completed && task.dueDate) {
        const due = new Date(task.dueDate).getTime();
        const now = Date.now();
        if (due - now < 60 * 60 * 1000 && due - now > 0) {
          toast.info(`Task "${task.text}" is due soon!`, { autoClose: 5000 });
        }
      }
    });
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch, ACTIONS }}>
      {children}
    </TaskContext.Provider>
  );
}
