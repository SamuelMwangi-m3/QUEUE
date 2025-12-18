export default function ActionItem({ item, onToggle }) {
  return (
    <li
      onClick={() => onToggle(item.id)}
      style={{
        cursor: "pointer",
        textDecoration: item.completed ? "line-through" : "none",
        padding: "0.5rem 0",
      }}
    >
      {item.text}
    </li>
  );
}
