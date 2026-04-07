export default function DifficultyBadge({ level }) {
  const colors = {
    easy: 'var(--accent-green)',
    medium: 'var(--accent-orange)',
    hard: 'var(--accent-red)',
  };

  return (
    <span style={{
      display: 'inline-block',
      padding: '4px 8px',
      borderRadius: 'var(--radius-sm)',
      backgroundColor: colors[level] || 'var(--text-muted)',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    }}>
      {level}
    </span>
  );
}