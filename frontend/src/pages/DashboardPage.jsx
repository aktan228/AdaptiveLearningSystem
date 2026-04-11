import { mockUser } from '../mock/user';
import { mockModules } from '../mock/modules';
import { mockSubmissions } from '../mock/submissions';
import { mockTasks } from '../mock/tasks';
import StatCard from '../components/StatCard';
import DifficultyBadge from '../components/DifficultyBadge';

const difficultyOrder = ['easy', 'medium', 'hard'];
const difficultyColors = {
  easy: 'var(--accent-green)',
  medium: 'var(--accent-orange)',
  hard: 'var(--accent-red)',
};

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
  });
}

function buildActivityWeeks(referenceDate, activityMap) {
  const end = new Date(referenceDate);
  const dayOfWeek = end.getDay();
  end.setDate(end.getDate() + (6 - dayOfWeek));

  const start = new Date(end);
  start.setDate(start.getDate() - 111);

  const weeks = [];
  const cursor = new Date(start);

  while (cursor <= end) {
    const week = [];
    for (let index = 0; index < 7; index += 1) {
      const dateKey = cursor.toISOString().slice(0, 10);
      week.push({
        date: dateKey,
        month: cursor.toLocaleDateString('en-US', { month: 'short' }),
        submissions: activityMap.get(dateKey) || 0,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return weeks;
}

export default function DashboardPage() {
  const solvedSubmissions = mockSubmissions.filter((submission) => submission.test_result && submission.ast_result);
  const solvedTaskIds = new Set(solvedSubmissions.map((submission) => submission.task_id));
  const successRate = mockSubmissions.length > 0
    ? Math.round((solvedSubmissions.length / mockSubmissions.length) * 100)
    : 0;
  const modulesCompleted = mockModules.filter((module) => module.completedLessons === module.lessonsCount).length;
  const recentCompletedTasks = [...solvedSubmissions]
    .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
    .filter((submission, index, arr) => index === arr.findIndex((item) => item.task_id === submission.task_id))
    .slice(0, 5);

  const difficultyProgress = difficultyOrder.map((level) => {
    const total = mockTasks.filter((task) => task.difficulty_level === level).length;
    const solved = mockTasks.filter((task) => task.difficulty_level === level && solvedTaskIds.has(task.id)).length;
    return { level, total, solved };
  });

  const activityMap = new Map(
    mockUser.activity_log.map((entry) => [entry.date, entry.submissions]),
  );
  const activityWeeks = buildActivityWeeks(mockUser.last_active, activityMap);
  const monthLabels = activityWeeks.map((week, index) => ({
    label: week[0].month,
    show: index === 0 || week[0].month !== activityWeeks[index - 1][0].month,
  }));
  const totalActiveDays = mockUser.activity_log.length;
  const solvedTasks = solvedTaskIds.size;
  const totalTasks = mockTasks.length;
  const solvedAngle = totalTasks > 0 ? Math.round((solvedTasks / totalTasks) * 360) : 0;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      animation: 'fadeIn 0.3s ease forwards',
    }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '34px', marginBottom: '8px' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '17px' }}>
          Track solved tasks, streak progress and recent completions in one place.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '24px',
      }}>
        <StatCard icon="◎" label="Solved tasks" value={solvedTasks} color="var(--accent-blue)" />
        <StatCard icon="↗" label="Success rate" value={`${successRate}%`} color="var(--accent-green)" />
        <StatCard icon="◌" label="Current streak" value={`${mockUser.current_streak} days`} color="var(--accent-orange)" />
        <StatCard icon="□" label="Modules completed" value={modulesCompleted} color="var(--accent-purple)" />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.15fr) minmax(320px, 0.85fr)',
        gap: '20px',
        marginBottom: '24px',
      }}>
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}>
          <div style={{
            width: '220px',
            height: '220px',
            borderRadius: '50%',
            background: `conic-gradient(var(--accent-blue) ${solvedAngle}deg, rgba(255,255,255,0.06) ${solvedAngle}deg 360deg)`,
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0,
          }}>
            <div style={{
              width: '162px',
              height: '162px',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ color: 'var(--text-primary)', fontSize: '42px', fontWeight: 'bold', lineHeight: 1 }}>
                {solvedTasks}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>/ {totalTasks}</div>
              <div style={{ color: 'var(--text-primary)', marginTop: '6px' }}>Solved</div>
            </div>
          </div>

          <div style={{ flex: '1 1 280px' }}>
            <div style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
              Difficulty progress
            </div>
            <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              A quick view of how many tasks are already completed at each level.
            </div>
            <div style={{ display: 'grid', gap: '12px' }}>
              {difficultyProgress.map((item) => (
                <div
                  key={item.level}
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div>
                    <div style={{ color: difficultyColors[item.level], fontWeight: 'bold', textTransform: 'uppercase', fontSize: '13px' }}>
                      {item.level}
                    </div>
                    <div style={{ color: 'var(--text-primary)', fontSize: '22px', fontWeight: 'bold' }}>
                      {item.solved}/{item.total}
                    </div>
                  </div>
                  <div style={{
                    width: '110px',
                    height: '8px',
                    borderRadius: '999px',
                    overflow: 'hidden',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                  }}>
                    <div style={{
                      width: `${item.total ? Math.round((item.solved / item.total) * 100) : 0}%`,
                      height: '100%',
                      backgroundColor: difficultyColors[item.level],
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
        }}>
          <div style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            Completed tasks
          </div>
          <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
            Your latest solved practices.
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {recentCompletedTasks.map((submission) => (
              <div
                key={submission.id}
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>{submission.task_title}</div>
                  <DifficultyBadge level={submission.difficulty_at_submission} />
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
                  {formatDate(submission.submitted_at)} • {Math.round(submission.time_spent / 60)} min • {submission.hints_used} hints
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px',
        marginBottom: '24px',
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '18px',
        }}>
          <div>
            <div style={{ color: 'var(--text-primary)', fontSize: '28px', fontWeight: 'bold' }}>
              {totalActiveDays} active days this quarter
            </div>
            <div style={{ color: 'var(--text-secondary)' }}>
              Consistency heatmap inspired by coding streak dashboards.
            </div>
          </div>
          <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
            <MetricPill label="Current streak" value={`${mockUser.current_streak} days`} />
            <MetricPill label="Max streak" value={`${mockUser.max_streak} days`} />
          </div>
        </div>

        <div style={{ overflowX: 'auto', paddingBottom: '4px' }}>
          <div style={{ minWidth: '860px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end' }}>
              {activityWeeks.map((week) => (
                <div key={week[0].date} style={{ display: 'grid', gap: '6px' }}>
                  {week.map((day) => (
                    <div
                      key={day.date}
                      title={`${day.date}: ${day.submissions} submissions`}
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '4px',
                        backgroundColor:
                          day.submissions >= 3 ? 'var(--accent-green)'
                            : day.submissions === 2 ? 'rgba(63, 185, 80, 0.7)'
                              : day.submissions === 1 ? 'rgba(63, 185, 80, 0.35)'
                                : 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.03)',
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
              {monthLabels.map((month, index) => (
                <div
                  key={`${month.label}-${index}`}
                  style={{
                    width: '14px',
                    minWidth: '14px',
                    marginRight: '20px',
                    color: month.show ? 'var(--text-secondary)' : 'transparent',
                    fontSize: '13px',
                  }}
                >
                  {month.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
      }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)' }}>
          <h2 style={{ color: 'var(--text-primary)', fontSize: '24px', marginBottom: '6px' }}>
            Submission history
          </h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Recent attempts across all loop lessons and difficulty levels.
          </p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '780px' }}>
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
              {mockSubmissions
                .slice()
                .sort((a, b) => new Date(b.submitted_at) - new Date(a.submitted_at))
                .map((submission) => (
                  <tr
                    key={submission.id}
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      backgroundColor: submission.test_result && submission.ast_result
                        ? 'rgba(63, 185, 80, 0.08)'
                        : submission.test_result || submission.ast_result
                          ? 'rgba(240, 136, 62, 0.08)'
                          : 'rgba(248, 81, 73, 0.08)',
                    }}
                  >
                    <td style={{ padding: '15px', color: 'var(--text-primary)' }}>
                      {submission.task_title}
                    </td>
                    <td style={{ padding: '15px', color: 'var(--text-secondary)' }}>
                      {new Date(submission.submitted_at).toLocaleString('en-US', {
                        month: 'short',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: submission.test_result ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {submission.test_result ? 'PASS' : 'FAIL'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: submission.ast_result ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                      {submission.ast_result ? 'PASS' : 'FAIL'}
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      {submission.hints_used}
                    </td>
                    <td style={{ padding: '15px', color: 'var(--text-primary)', textTransform: 'capitalize' }}>
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

function MetricPill({ label, value }) {
  return (
    <div style={{
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      backgroundColor: 'var(--bg-primary)',
      border: '1px solid var(--border-color)',
      minWidth: '150px',
    }}>
      <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '4px' }}>{label}</div>
      <div style={{ color: 'var(--text-primary)', fontSize: '20px', fontWeight: 'bold' }}>{value}</div>
    </div>
  );
}
