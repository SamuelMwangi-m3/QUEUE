export default function Header({ progress, total, completed }) {
  return (
    <header style={{ textAlign: "center", margin: "2rem 0" }}>
      <h1>QUEUE App</h1>
      <p>
        {completed} of {total} tasks completed
      </p>
      <div
        style={{
          height: "10px",
          background: "#f0f0f0",
          borderRadius: "5px",
          overflow: "hidden",
          margin: "0.5rem 0",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#007bff",
            transition: "width 0.3s",
          }}
        />
      </div>
    </header>
  );
}
