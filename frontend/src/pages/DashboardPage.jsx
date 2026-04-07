import { mockUser } from '../mock/user';
import { mockModules } from '../mock/modules';
import { mockSubmissions } from '../mock/submissions';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';

export default function DashboardPage() {
  // Calculate stats
  const totalTasks = mockUser.total_tasks_completed;
  const currentStreak = mockUser.current_streak;

  const successRate = mockSubmissions.length > 0
    ? Math.round((mockSubmissions.filter(s => s.test_result && s.ast_result).length / mockSubmissions.length) * 100)
    : 0;

  const modulesCompleted = mockModules.filter(m => m.completedLessons === m.lessonsCount).length;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <h1 style={{
        color: 'var(--text-primary)',
        fontSize: '32px',
        marginBottom: '30px',
        textAlign: 'center',
      }}>
        My Progress
      </h1>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px',
      }}>
        <StatCard
          icon="📚"
          label="Total Tasks Completed"
          value={totalTasks}
          color="var(--accent-blue)"
        />
        <StatCard
          icon="🔥"
          label="Current Streak"
          value={`${currentStreak} days`}
          color="var(--accent-orange)"
        />
        <StatCard
          icon="📊"
          label="Success Rate"
          value={`${successRate}%`}
          color="var(--accent-green)"
        />
        <StatCard
          icon="🏆"
          label="Modules Completed"
          value={modulesCompleted}
          color="var(--accent-purple)"
        />
      </div>

      {/* Module Progress */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          color: 'var(--text-primary)',
          fontSize: '24px',
          marginBottom: '20px',
        }}>
          Module Progress
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {mockModules.map((module) => (
            <div key={module.id} style={{
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '10px',
              }}>
                <h3 style={{ color: 'var(--text-primary)', margin: 0 }}>
                  {module.title}
                </h3>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {module.completedLessons}/{module.lessonsCount} lessons
                </span>
              </div>
              <ProgressBar
                value={module.completedLessons}
                max={module.lessonsCount}
                label=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Submission History */}
      <div>
        <h2 style={{
          color: 'var(--text-primary)',
          fontSize: '24px',
          marginBottom: '20px',
        }}>
          Submission History
        </h2>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderBottom: '1px solid var(--border-color)',
              }}>
                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-primary)' }}>Task</th>
                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-primary)' }}>Date</th>
                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--text-primary)' }}>Test</th>
                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--text-primary)' }}>AST</th>
                <th style={{ padding: '15px', textAlign: 'center', color: 'var(--text-primary)' }}>Hints</th>
                <th style={{ padding: '15px', textAlign: 'left', color: 'var(--text-primary)' }}>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {mockSubmissions.map((submission) => (
                <tr
                  key={submission.id}
                  style={{
                    borderBottom: '1px solid var(--border-color)',
                    backgroundColor: submission.test_result && submission.ast_result
                      ? 'rgba(63, 185, 80, 0.1)'
                      : submission.test_result || submission.ast_result
                      ? 'rgba(248, 136, 62, 0.1)'
                      : 'rgba(248, 81, 73, 0.1)',
                  }}
                >
                  <td style={{ padding: '15px', color: 'var(--text-primary)' }}>
                    {submission.task_title}
                  </td>
                  <td style={{ padding: '15px', color: 'var(--text-secondary)' }}>
                    {formatDate(submission.submitted_at)}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    {submission.test_result ? '✅' : '❌'}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    {submission.ast_result ? '✅' : '❌'}
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    {submission.hints_used}
                  </td>
                  <td style={{ padding: '15px', color: 'var(--text-primary)' }}>
                    {submission.difficulty_at_submission}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}