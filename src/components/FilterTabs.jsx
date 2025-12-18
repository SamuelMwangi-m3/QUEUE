export default function FilterTabs({ current, setFilter }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}>
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          style={{
            padding: "0.5rem 1rem",
            background: current === filter ? "#007bff" : "#f0f0f0",
            color: current === filter ? "#fff" : "#000",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
