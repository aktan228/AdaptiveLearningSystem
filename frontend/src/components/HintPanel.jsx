import { useState } from 'react';

export default function HintPanel({ hints, onHintUsed }) {
  const [revealedHints, setRevealedHints] = useState([]);

  const handleGetHint = () => {
    if (revealedHints.length < hints.length) {
      const newHint = hints[revealedHints.length];
      setRevealedHints([...revealedHints, newHint]);
      if (onHintUsed) onHintUsed();
    }
  };

  const getTintColor = (level) => {
    switch (level) {
      case 1: return 'var(--accent-blue)';
      case 2: return 'var(--accent-orange)';
      case 3: return 'var(--accent-red)';
      default: return 'var(--bg-tertiary)';
    }
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <button
        onClick={handleGetHint}
        disabled={revealedHints.length >= hints.length}
        style={{
          padding: '10px 15px',
          backgroundColor: revealedHints.length >= hints.length ? 'var(--text-muted)' : 'var(--accent-orange)',
          color: 'white',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          fontSize: '14px',
          fontWeight: 'bold',
          cursor: revealedHints.length >= hints.length ? 'not-allowed' : 'pointer',
        }}
      >
        {revealedHints.length >= hints.length ? 'No more hints' : 'Get Hint'}
      </button>

      <div style={{ marginTop: '15px' }}>
        {revealedHints.map((hint, index) => (
          <div
            key={index}
            style={{
              backgroundColor: getTintColor(hint.level),
              borderRadius: 'var(--radius-md)',
              padding: '10px',
              marginBottom: '10px',
              animation: 'slideInUp 0.4s ease forwards',
            }}
          >
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(0,0,0,0.2)',
              color: 'white',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '12px',
              fontWeight: 'bold',
              marginBottom: '5px',
            }}>
              L{hint.level}
            </div>
            <p style={{ color: 'white', margin: 0, fontSize: '14px' }}>{hint.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}