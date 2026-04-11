import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

export default function ModuleCard({ module, isLocked }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isLocked) {
      navigate(`/module/${module.id}`);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "var(--bg-secondary)",
        border: "1px solid var(--border-color)",
        borderRadius: "var(--radius-lg)",
        padding: "22px",
        cursor: isLocked ? "not-allowed" : "pointer",
        opacity: isLocked ? 0.6 : 1,
        position: "relative",
        transition: "all 0.2s ease",
        minHeight: "250px",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        if (!isLocked) {
          e.currentTarget.style.borderColor = "var(--accent-blue)";
          e.currentTarget.style.boxShadow = "var(--shadow-card)";
          e.currentTarget.style.transform = "translateY(-4px)";
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--border-color)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {isLocked && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "20px",
            color: "var(--text-muted)",
          }}
        >
          🔒
        </div>
      )}
      {module.completedLessons === module.lessonsCount && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            fontSize: "20px",
            color: "var(--accent-green)",
          }}
        >
          ✓
        </div>
      )}
      <h3 style={{ color: "var(--text-primary)", marginBottom: "10px", fontSize: "18px" }}>
        {module.title}
      </h3>
      <p style={{ color: "var(--text-secondary)", marginBottom: "15px", fontSize: "14px" }}>
        {module.description}
      </p>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "18px",
        }}
      >
        {module.focus.map((item) => (
          <span
            key={item}
            style={{
              padding: "4px 8px",
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(88, 166, 255, 0.12)",
              color: "var(--accent-blue)",
              fontSize: "12px",
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <ProgressBar
        value={module.completedLessons}
        max={module.lessonsCount}
        label={`${module.completedLessons}/${module.lessonsCount} lessons`}
      />
      <button
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: isLocked ? "var(--text-muted)" : "var(--accent-blue)",
          color: "white",
          border: "none",
          borderRadius: "var(--radius-md)",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: isLocked ? "not-allowed" : "pointer",
          marginTop: "auto",
        }}
        disabled={isLocked}
      >
        {module.completedLessons === 0 ? "Open module" : "Continue module"}
      </button>
    </div>
  );
}
