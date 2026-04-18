import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();

  const navItems = [
    {
      to: "/modules",
      label: "Modules",
      isActive:
        location.pathname === "/modules" ||
        location.pathname.startsWith("/module/") ||
        location.pathname.startsWith("/lesson/") ||
        location.pathname.startsWith("/task/"),
    },
    {
      to: "/dashboard",
      label: "Dashboard",
      isActive: location.pathname === "/dashboard",
    },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        minHeight: "72px",
        backgroundColor: "rgba(22, 27, 34, 0.96)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        gap: "16px",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>🐍</span>
          <Link
            to="/modules"
            style={{
              color: "var(--accent-blue)",
              fontSize: "20px",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            PyLearn
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              style={{
                color: item.isActive ? "var(--text-primary)" : "var(--text-secondary)",
                textDecoration: "none",
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                backgroundColor: item.isActive ? "rgba(88, 166, 255, 0.12)" : "transparent",
                border: item.isActive ? "1px solid rgba(88, 166, 255, 0.28)" : "1px solid transparent",
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              fontSize: "13px",
              pointerEvents: "none",
            }}
          >
            ⌕
          </span>
          <input
            type="text"
            readOnly
            value=""
            placeholder="Search..."
            style={{
              minWidth: "220px",
              padding: "8px 12px 8px 30px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-secondary)",
            }}
          />
        </div>

        {user ? (
          <Link
            to="/profile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-color)",
              backgroundColor: location.pathname === "/profile" ? "rgba(88, 166, 255, 0.12)" : "transparent",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {user.username?.charAt(0).toUpperCase()}
            </div>
            <span style={{ color: "var(--text-primary)" }}>{user.username}</span>
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              style={{
                textDecoration: "none",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--radius-md)",
                padding: "8px 12px",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "white",
                backgroundColor: "var(--accent-blue)",
                border: "1px solid transparent",
                borderRadius: "var(--radius-md)",
                padding: "8px 12px",
              }}
            >
              Register
            </Link>
          </>
        )}

        <button
          type="button"
          style={{
            color: "white",
            backgroundColor: "var(--accent-orange)",
            border: "none",
            borderRadius: "var(--radius-md)",
            padding: "8px 14px",
            fontWeight: "bold",
          }}
        >
          Premium
        </button>
      </div>
    </nav>
  );
}
