import ActionItem from "./ActionItem";

export default function ActionList({ items, onToggle }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item) => (
        <ActionItem key={item.id} item={item} onToggle={onToggle} />
      ))}
    </ul>
  );
}
