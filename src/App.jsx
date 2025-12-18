import { useState } from "react";
import Header from "./components/Header";
import ActionForm from "./components/ActionForm";
import ActionList from "./components/ActionList";
import FilterTabs from "./components/FilterTabs";
import useLocalStorage from "../hooks/useLocalStorage";

export default function App() {
  // Persist tasks in local storage
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [filter, setFilter] = useState("All");

  // Add new task
  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  // Toggle task complete/incomplete
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Filter tasks
  const filteredTasks =
    filter === "All"
      ? tasks
      : filter === "Pending"
      ? tasks.filter((t) => !t.completed)
      : tasks.filter((t) => t.completed);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem" }}>
      <Header />
      <ActionForm onAdd={addTask} />
      <FilterTabs current={filter} setFilter={setFilter} />
      <ActionList items={filteredTasks} onToggle={toggleTask} />
    </div>
  );
}
