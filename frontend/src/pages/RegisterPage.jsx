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

const fieldErrorStyle = {
  color: 'var(--accent-red)',
  fontSize: '13px',
  marginTop: '6px',
};

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const clearFieldError = (fieldName) => {
    setFieldErrors((prev) => ({ ...prev, [fieldName]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setFieldErrors({ confirmPassword: 'Passwords do not match' });
      return;
    }

    setIsSubmitting(true);
    const result = await register(username, email, password);
    setIsSubmitting(false);

    if (result.success) {
      navigate('/modules');
      return;
    }

    setError(result.error || 'Registration failed');
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
          Join PyLearn
        </h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-secondary)',
              marginBottom: '5px',
              fontSize: '14px',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                clearFieldError('username');
              }}
              required
              style={inputStyle(Boolean(fieldErrors.username))}
              placeholder="yourusername"
            />
            {fieldErrors.username && <div style={fieldErrorStyle}>{fieldErrors.username}</div>}
          </div>

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
            {fieldErrors.email && <div style={fieldErrorStyle}>{fieldErrors.email}</div>}
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
                clearFieldError('confirmPassword');
              }}
              required
              style={inputStyle(Boolean(fieldErrors.password))}
              placeholder="********"
            />
            {fieldErrors.password && <div style={fieldErrorStyle}>{fieldErrors.password}</div>}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: 'var(--text-secondary)',
              marginBottom: '5px',
              fontSize: '14px',
            }}>
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                clearFieldError('confirmPassword');
              }}
              required
              style={inputStyle(Boolean(fieldErrors.confirmPassword))}
              placeholder="********"
            />
            {fieldErrors.confirmPassword && <div style={fieldErrorStyle}>{fieldErrors.confirmPassword}</div>}
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
            {isSubmitting ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <span style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{
              color: 'var(--accent-blue)',
              textDecoration: 'none',
            }}>
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
