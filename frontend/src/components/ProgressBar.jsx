import { useEffect, useState } from 'react';

export default function ProgressBar({ value, max, label }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const percentage = Math.round((value / max) * 100);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const getColor = () => {
    if (percentage === 100) return 'var(--accent-green)';
    if (percentage > 50) return 'var(--accent-blue)';
    if (percentage > 0) return 'var(--accent-orange)';
    return 'var(--text-muted)';
  };

  return (
    <div style={{ marginBottom: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{label}</span>
        <span style={{ color: 'var(--text-primary)', fontSize: '14px' }}>{percentage}%</span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${animatedValue}%`,
          height: '100%',
          backgroundColor: getColor(),
          transition: 'width 0.5s ease',
        }} />
      </div>
    </div>
  );
}