import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '64px',
      backgroundColor: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-color)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 20px',
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '24px' }}>🐍</span>
        <Link to="/modules" style={{ color: 'var(--accent-blue)', fontSize: '20px', fontWeight: 'bold', textDecoration: 'none' }}>
          PyLearn
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link
          to="/modules"
          style={{
            color: location.pathname === '/modules' ? 'var(--accent-blue)' : 'var(--text-secondary)',
            textDecoration: 'none',
            borderBottom: location.pathname === '/modules' ? '2px solid var(--accent-blue)' : 'none',
            paddingBottom: '5px',
          }}
        >
          Modules
        </Link>
        <Link
          to="/dashboard"
          style={{
            color: location.pathname === '/dashboard' ? 'var(--accent-blue)' : 'var(--text-secondary)',
            textDecoration: 'none',
            borderBottom: location.pathname === '/dashboard' ? '2px solid var(--accent-blue)' : 'none',
            paddingBottom: '5px',
          }}
        >
          Dashboard
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-blue)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
        }}>
          {user?.username?.charAt(0).toUpperCase()}
        </div>
        <span style={{ color: 'var(--text-primary)' }}>{user?.username}</span>
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}