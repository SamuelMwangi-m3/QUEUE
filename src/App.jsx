import { useState, useEffect } from "react";
import Header from "./components/Header";
import ActionForm from "./components/ActionForm";
import ActionList from "./components/ActionList";
import FilterTabs from "./components/FilterTabs";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Add new task
  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), completed: false }]);
  };

  // Toggle task complete/incomplete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Edit task
  const editTask = (id, updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  // Notifications for due tasks
  useEffect(() => {
    tasks.forEach((task) => {
      if (!task.completed && task.dueDate) {
        const due = new Date(task.dueDate).getTime();
        const now = Date.now();
        if (due - now < 60 * 60 * 1000 && due - now > 0) {
          if (Notification.permission === "granted") {
            new Notification("Task Due Soon!", {
              body: task.text,
            });
          }
        }
      }
    });
  }, [tasks]);

  // Request notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter === "All"
        ? true
        : filter === "Pending"
        ? !task.completed
        : task.completed;

    const categoryMatch = categoryFilter === "All" ? true : task.category === categoryFilter;

    return statusMatch && categoryMatch;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  // Extract unique categories for filter tabs
  const categories = ["All", ...new Set(tasks.map((t) => t.category).filter(Boolean))];

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <Header progress={progress} total={totalTasks} completed={completedTasks} />

      <ActionForm onAdd={addTask} />

      <FilterTabs
        current={filter}
        setFilter={setFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        categories={categories}
      />

      <ActionList items={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
}
