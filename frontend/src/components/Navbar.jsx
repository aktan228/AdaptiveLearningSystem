import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
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
    {
      to: "/profile",
      label: "Profile",
      isActive: location.pathname === "/profile",
    },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "rgba(22, 27, 34, 0.94)",
        borderBottom: "1px solid var(--border-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 1000,
        backdropFilter: "blur(10px)",
      }}
    >
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

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
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

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link
          to="/profile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
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
            {user?.username?.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: "var(--text-primary)" }}>{user?.username}</span>
        </Link>
        <button
          onClick={logout}
          style={{
            background: "none",
            border: "1px solid var(--border-color)",
            color: "var(--text-secondary)",
            cursor: "pointer",
            borderRadius: "var(--radius-md)",
            padding: "8px 12px",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
