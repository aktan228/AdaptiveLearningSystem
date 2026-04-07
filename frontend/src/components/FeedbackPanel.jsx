export default function FeedbackPanel({ feedback }) {
  if (!feedback) return null;

  const { test_result, ast_result, feedback_text } = feedback;

  return (
    <div style={{
      marginTop: '20px',
      padding: '15px',
      backgroundColor: 'var(--bg-secondary)',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border-color)',
      animation: 'slideInUp 0.4s ease forwards',
    }}>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{test_result ? '✅' : '❌'}</span>
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>Test Cases</div>
            <div style={{
              color: test_result ? 'var(--accent-green)' : 'var(--accent-red)',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              {test_result ? 'PASS' : 'FAIL'}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '18px' }}>{ast_result ? '✅' : '❌'}</span>
          <div>
            <div style={{ fontWeight: 'bold', color: 'var(--text-primary)' }}>AST Analysis</div>
            <div style={{
              color: ast_result ? 'var(--accent-green)' : 'var(--accent-red)',
              fontSize: '14px',
              fontWeight: 'bold',
            }}>
              {ast_result ? 'PASS' : 'FAIL'}
            </div>
          </div>
        </div>
      </div>
      <div style={{
        padding: '10px',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text-secondary)',
        fontSize: '14px',
      }}>
        {feedback_text}
      </div>
    </div>
  );
}