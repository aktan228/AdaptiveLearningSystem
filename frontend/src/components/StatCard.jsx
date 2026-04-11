export default function StatCard({ icon, label, value, color }) {
  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-md)",
        padding: "20px",
        textAlign: "center",
        transition: "all 0.2s ease",
        boxShadow: "var(--shadow-card)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 32px ${color}40`;
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "var(--shadow-card)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div style={{ fontSize: "32px", marginBottom: "10px" }}>{icon}</div>
      <div
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "var(--text-primary)",
          marginBottom: "5px",
        }}
      >
        {value}
      </div>
      <div style={{ color: "var(--text-secondary)", fontSize: "14px" }}>{label}</div>
    </div>
  );
}
