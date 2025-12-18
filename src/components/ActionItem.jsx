import { useState } from "react";

export default function ActionItem({ item, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(item.text);

  const handleEdit = () => {
    onEdit(item.id, { text: newText });
    setEditing(false);
  };

  const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && !item.completed;

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.5rem",
        margin: "0.25rem 0",
        borderRadius: "5px",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        cursor: "pointer",
        opacity: item.completed ? 0.6 : 1,
        border: isOverdue ? "2px solid red" : "none",
      }}
    >
      <div onClick={() => onToggle(item.id)} style={{ flex: 1 }}>
        {editing ? (
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={(e) => e.key === "Enter" && handleEdit()}
          />
        ) : (
          <>
            <span style={{ textDecoration: item.completed ? "line-through" : "none", fontWeight: "bold" }}>{item.text}</span>
            {item.priority && <span style={{ marginLeft: "0.5rem", color: item.priority === "High" ? "red" : item.priority === "Medium" ? "orange" : "green" }}>●</span>}
            {item.category && <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", color: "#555" }}>[{item.category}]</span>}
            {item.dueDate && <span style={{ marginLeft: "0.5rem", fontSize: "0.8rem", color: isOverdue ? "red" : "#555" }}>{item.dueDate}</span>}
          </>
        )}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <button onClick={() => setEditing(!editing)} style={{ cursor: "pointer" }}>✏️</button>
        <button onClick={() => onDelete(item.id)} style={{ cursor: "pointer" }}>🗑️</button>
      </div>
    </li>
  );
}
