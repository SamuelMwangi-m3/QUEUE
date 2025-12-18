export default function FilterTabs({ current, setFilter, categoryFilter, setCategoryFilter, categories }) {
  const filters = ["All", "Pending", "Completed"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", margin: "1rem 0" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setFilter(filter)}
            style={{
              background: current === filter ? "#007bff" : "#f0f0f0",
              color: current === filter ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0.5rem 1rem",
              cursor: "pointer",
            }}
          >
            {filter}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            style={{
              background: categoryFilter === cat ? "#28a745" : "#f0f0f0",
              color: categoryFilter === cat ? "#fff" : "#000",
              border: "none",
              borderRadius: "5px",
              padding: "0.25rem 0.5rem",
              cursor: "pointer",
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
