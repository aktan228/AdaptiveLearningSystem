import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const inputStyle = (hasError) => ({
  width: '100%',
  padding: '12px',
  backgroundColor: 'var(--bg-tertiary)',
  border: `1px solid ${hasError ? 'var(--accent-red)' : 'var(--border-color)'}`,
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontSize: '16px',
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const clearFieldError = (fieldName) => {
    setFieldErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    setIsSubmitting(true);
    const result = await login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/modules');
      return;
    }

    setError(result.error || 'Invalid credentials');
    setFieldErrors(result.fieldErrors || {});
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--bg-primary)',
      backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(88, 166, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(188, 140, 255, 0.1) 0%, transparent 50%)',
    }}>
      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--shadow-card)',
        animation: 'fadeIn 0.3s ease forwards',
      }}>
        <h1 style={{
          textAlign: 'center',
          color: 'var(--text-primary)',
          marginBottom: '30px',
          fontSize: '24px',
        }}>
          Welcome to PyLearn
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-secondary)',
              marginBottom: '5px',
              fontSize: '14px',
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
              required
              style={inputStyle(Boolean(fieldErrors.email))}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-secondary)',
              marginBottom: '5px',
              fontSize: '14px',
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError('password');
              }}
              required
              style={inputStyle(Boolean(fieldErrors.password))}
              placeholder="********"
            />
          </div>

          {error && (
            <div style={{
              color: 'var(--accent-red)',
              fontSize: '14px',
              marginBottom: '20px',
              textAlign: 'center',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: 'var(--accent-blue)',
              color: 'white',
              border: 'none',
              borderRadius: 'var(--radius-md)',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
              marginBottom: '20px',
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none',
            }}>
              Register
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
